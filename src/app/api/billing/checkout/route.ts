import { stripe } from "@/lib/stripe/index";
import { absoluteUrl } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { Product } from "use-shopping-cart/core";
import { CartDetails } from "use-shopping-cart/core";
import { validateCartItems } from "use-shopping-cart/utilities";

interface BuyStripeProductActionProps {
  isSubscribed?: boolean;
  stripeCustomerId?: string | null;
  isCurrentPlan?: boolean;
  stripePriceId?: string;
  email?: string;
  userId?: string;
  cartDetails: CartDetails;
  products: { [id: string]: Product };
  locale: "en" | "fr";
}

export async function POST(req: Request) {
  const body: BuyStripeProductActionProps = await req.json();
  const { isSubscribed, stripeCustomerId, userId, stripePriceId, email, locale, cartDetails } = body;
  // console.log("THE BODY OF THE API ROUTE");
  // console.log(body);
  const billingUrl = absoluteUrl("/checkout/return");

  let sanityInventory = await client.fetch(
    `*[_type=='product']{'name':title.${locale},price,'id':slug.current,'description':subTitle.${locale},'image':images[0].image.asset->{url}.url}`
  );

  let inventory = formatInventory(sanityInventory);

  let line_items;
  try {
    line_items = validateCartItems(inventory, cartDetails);
  } catch (error) {
    return {
      statusCode: 422,
      body: JSON.stringify({
        message: "Some of the items in your cart are invalid.",
        error: error.message,
      }),
    };
  }
  // console.log("============ LINE ITEMS ==============");
  // console.log(line_items);
  // console.log("============ END ==============");

  // if (isSubscribed && stripeCustomerId) {
  //   const stripeSession = await stripe.billingPortal.sessions.create({
  //     // ui_mode: "embedded",
  //     customer: stripeCustomerId,
  //     return_url: billingUrl,
  //   });

  //   return new Response(JSON.stringify({ url: stripeSession.url }), {
  //     status: 200,
  //   });
  // }
  const stripeSession = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    // success_url: billingUrl.concat("?success=true"),
    // cancel_url: billingUrl,
    // payment_method_types: ["card"],
    mode: "payment",
    billing_address_collection: "auto",
    shipping_address_collection: { allowed_countries: ["FR", "BE", "ES"] },
    // shipping_options: [{ shipping_rate: "shr_1P7xBWLUFiXiOuXApaCl1fVJ" }], //dev
    shipping_options: [{ shipping_rate: "shr_1PKD41LUFiXiOuXAHk37Phci" }],
    customer_email: email,
    line_items,
    metadata: {
      userId,
    },
    // return_url: billingUrl.concat(`/return?session_id={CHECKOUT_SESSION_ID}`),
    return_url: billingUrl.concat(`?session_id={CHECKOUT_SESSION_ID}`),
  });

  return new Response(JSON.stringify({ clientSecret: stripeSession.client_secret }), {
    status: 200,
  });
}

function formatInventory(sanityInventory: Product[]): Product[] {
  let inventory = sanityInventory.map((item) => {
    return {
      name: item.name,
      price: item.price * 100,
      description: item.description,
      image: item.image,
      id: item.id,
      currency: "eur",
      product_data: {
        // url: `https://nu-soins.com/shop/${item.id}`,
      },
    };
    // quantity
  });
  return inventory;
}

export async function GET(req: Request) {
  // console.log("======================== NEW REQUEST ======================");
  const session_id = await req.nextUrl.searchParams.get("session_id");

  const session = await stripe.checkout.sessions.retrieve(session_id);
  // console.log(session);

  return new Response(
    JSON.stringify({
      status: session.status,
      customer_email: session?.customer_details?.email,
    }),
    {
      status: 200,
    }
  );
}
