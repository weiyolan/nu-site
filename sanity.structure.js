import { BlockElementIcon, UlistIcon, EarthGlobeIcon, MenuIcon, HomeIcon, CommentIcon, EnvelopeIcon, TriangleOutlineIcon, MasterDetailIcon } from "@sanity/icons";
import {
  Blend,
  Book,
  BookOpen,
  Carrot,
  CookingPot,
  Flame,
  Footprints,
  GalleryThumbnails,
  GalleryVertical,
  Handshake,
  Heading1Icon,
  HelpCircle,
  Image,
  Images,
  LayoutGrid,
  Leaf,
  Milestone,
  PanelBottom,
  Quote,
  Rows3,
  Star,
  Stars,
  Store,
  SwatchBook,
  ThumbsUp,
} from "lucide-react";
// import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

export const myStructure = (S, context) => {
  return S.list()
    .title("Contenu ~ Profitez Lou!")
    .items([
      S.listItem()
        .title("Accueil")
        .icon(HomeIcon)
        .child(
          S.list()
            .title("Sections")
            .items([
              S.listItem().title("Héro").icon(GalleryThumbnails).child(S.document().schemaType("hero").documentId("homeHero")),
              S.listItem().title("Présentation Produit").icon(Stars).child(S.document().schemaType("homeProductPresentation")),
              S.listItem().title("Avis").icon(Quote).child(S.document().schemaType("reviews").documentId("homeReviews")),
              S.listItem().title("Appel d'Action (CTA)").icon(Flame).child(S.document().schemaType("cta")),
              S.listItem().title("Text & Image").icon(Images).id("imagePop1").child(S.document().schemaType("imagePop").documentId("article")),
              S.listItem().title("Produits Favoris").icon(Star).child(S.document().schemaType("homeFavorites")),
              S.listItem().title("Text & Image").icon(Images).id("imagePop2").child(S.document().schemaType("imagePop").documentId("article2")),
              S.listItem().title("Blogs").icon(BookOpen).child(S.document().schemaType("homeBlogs")),
              // S.listItem().title("Bermuda Values").icon(BlockElementIcon).child(S.document().schemaType("hpValues").documentId("hpValues")),
              // S.listItem().title("CTA").icon(BlockElementIcon).child(S.document().schemaType("hpCTA").documentId("hpCTA")),
              // S.listItem().title("About").icon(BlockElementIcon).child(S.document().schemaType("hpAbout").documentId("hpAbout")),
              // S.listItem().title("Bermuda Network").icon(BlockElementIcon).child(
              // S.document().schemaType("hpNetwork").documentId("hpNetwork")
              // ),
            ])
        ),
      S.listItem()
        .title("Shop")
        .icon(Store)
        .child(
          S.list()
            .title("Sections")
            .items([
              // S.listItem().title("Vitrines").icon(BlockElementIcon).child(
              S.listItem().title("Héro").icon(GalleryThumbnails).child(S.document().schemaType("hero").documentId("shopHero")),
              orderableDocumentListDeskItem({ type: "shopSection", title: "Showcase Produits", icon: SwatchBook, S: S, context: context }),
              S.listItem().title("Avis").icon(Quote).child(S.document().schemaType("reviews").documentId("shopReviews")),
              S.listItem().title("Écologie").icon(Leaf).child(S.document().schemaType("ecology")),
              S.divider(),
              S.listItem().title("Produits Recommandés").icon(ThumbsUp).child(S.document().schemaType("productRecommended")),
              // documentId("shopReviews")
            ])
        ),
      S.listItem()
        .title("A Propos")
        .icon(MasterDetailIcon)
        .child(
          S.list()
            .title("Sections")
            .items([
              S.listItem().title("Héro").icon(GalleryThumbnails).child(S.document().schemaType("hero").documentId("aboutHero")),
              S.listItem().title("Carrés").icon(LayoutGrid).child(S.document().schemaType("aboutSquares").documentId("intro")),
              S.listItem().title("Text & Image Horizontal").icon(GalleryVertical).id("aboutHorizontal").child(S.document().schemaType("imagePop").documentId("aboutHorizontal")),
              S.listItem().title("Text & Image").icon(Images).id("about").child(S.document().schemaType("imagePop").documentId("about")),
              S.listItem().title("Valeurs").icon(Blend).child(S.document().schemaType("aboutValuesSection").documentId("valeurs")),
              S.listItem().title("Infos Ingrédients").icon(Carrot).child(S.document().schemaType("aboutIngredientSection").documentId("ingredients")),
              S.listItem().title("Bref").icon(Handshake).child(S.document().schemaType("aboutBref").documentId("aboutBref")),
              S.divider(),
              orderableDocumentListDeskItem({ type: "aboutIngredient", title: "Ingrédients", icon: CookingPot, S: S, context: context }),

              // S.listItem().title("Trusted By").icon(BlockElementIcon).child(S.document().schemaType("cpTrustedBy").documentId("cpTrustedBy")),
              // S.listItem().title("Form").icon(BlockElementIcon).child(S.document().schemaType("cpForm").documentId("cpForm")),
              // S.listItem().title("Fun Facts").icon(BlockElementIcon).child(S.document().schemaType("cpNumbers").documentId("cpNumbers")),
            ])
        ),
      S.listItem()
        .title("Aide")
        .icon(HelpCircle)
        .child(
          S.list()
            .title("Sections")
            .items([
              S.listItem().title("Intro").icon(Image).child(S.document().schemaType("helpTitle").documentId("helpTitle")),
              S.listItem().icon(Rows3).title("FAQ").child(S.document().title("FAQ").schemaType("accordion").documentId("faqQuestions")),

              // S.divider(),
              // orderableDocumentListDeskItem({ type: "aboutIngredient", title: "Ingrédients", icon: CookingPot, S: S, context: context }),
            ])
        ),
      S.documentTypeListItem("product").id("productPages"),
      S.divider(),
      S.listItem()
        .title("Bar de Navigation")
        .icon(Milestone)
        .child(
          S.list()
            .title("Sections")
            .items([
              S.listItem().title("Bannier").icon(CommentIcon).child(S.document().schemaType("navigationBanner").title("Bannier").documentId("navigationBanner")),
              S.listItem().title("Navigation").icon(UlistIcon).child(S.document().schemaType("navigationBar").title("Navigation").documentId("nav")),
            ])
        ),
      S.listItem()
        .title("Pied de page")
        .icon(Footprints)
        .child(
          S.list()
            .title("Sections")
            .items([
              S.listItem().title("Messages").icon(CommentIcon).child(S.document().schemaType("footerMessages").documentId("footerMessages")),
              S.listItem().title("Newsletter").icon(EnvelopeIcon).child(S.document().schemaType("footerNewsletter").documentId("footerNewsletter")),
              S.listItem().title("Quote").icon(Quote).child(S.document().schemaType("footerQuote").title("Quote").documentId("footerQuote")),
              S.listItem().title("Listes de Navigation").icon(UlistIcon).child(S.document().schemaType("footerLists").title("Listes").documentId("footerLists")),
            ])
        ),
      S.divider(),

      // orderableDocumentListDeskItem({ type: "aboutIngredient", title: "Ingrédients", icon: CookingPot, S: S, context: context }),

      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            // "contactPageGIS",
            // "cpDetails",
            // "cpTrustedBy",
            // "contactPageAOS",
            // "cpNumbers",
            "footerLists",
            // "cpForm",
            "footer",
            // "hpAbout",
            // "hpCTA",
            // "hpHero",
            // "hpValues",
            // "hpNetwork",
            "shopSection",
            "product",
            "aboutIngredient",
            // "legalDoc",
            // "contactPagePFS",
            // "mainPageXXX",
            // "mainPageYYY",
          ].includes(listItem.getId())
      ),
    ]);
};
