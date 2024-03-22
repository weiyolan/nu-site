import { BlockElementIcon, UlistIcon, EarthGlobeIcon, MenuIcon, HomeIcon, CommentIcon, EnvelopeIcon, TriangleOutlineIcon, MasterDetailIcon } from "@sanity/icons";
import { Leaf, Milestone, PanelBottom, Quote, Star, Stars, Store, SwatchBook } from "lucide-react";
// import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

export const myStructure = (S,context) => {
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
              S.listItem().title("Avis").icon(Quote).child(S.document().schemaType("reviews").documentId('homeReviews')),
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
                orderableDocumentListDeskItem({type: 'shopSection', title:'Vitrines', icon:SwatchBook,S:S, context:context}),
                S.listItem().title("Avis").icon(Quote).child(S.document().schemaType("reviews").documentId('shopReviews')),
                S.listItem().title("Écologie").icon(Leaf).child(S.document().schemaType("ecology")),
                // documentId("shopReviews")
            ])
        ),
      S.listItem()
        .title("Contact")
        .icon(MasterDetailIcon)
        .child(
          S.list()
            .title("Sections")
            .items([
              S.listItem().title("Contact Details").icon(BlockElementIcon).child(S.document().schemaType("cpDetails").documentId("cpDetails")),
              S.listItem().title("Trusted By").icon(BlockElementIcon).child(S.document().schemaType("cpTrustedBy").documentId("cpTrustedBy")),
              S.listItem().title("Form").icon(BlockElementIcon).child(S.document().schemaType("cpForm").documentId("cpForm")),
              S.listItem().title("Fun Facts").icon(BlockElementIcon).child(S.document().schemaType("cpNumbers").documentId("cpNumbers")),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Bar de Navigation")
        .icon(Milestone)
        .child(
          S.list()
            .title("Sections")
            .items([
              S.listItem().title("Navigation").icon(UlistIcon).child(S.document().schemaType("nav").title("Navigation").documentId("nav")),
              S.listItem().title("Bannier").icon(CommentIcon).child(S.document().schemaType("navigationBanner").title("Bannier").documentId("navigationBanner")),
            ])
        ),
      S.listItem()
        .title("Pied de page")
        .icon(PanelBottom)
        .child(
          S.list()
            .title("Sections")
            .items([
              S.listItem().title("Newsletter").icon(EnvelopeIcon).child(S.document().schemaType("footerNewsletter").documentId("footerNewsletter")),
              S.listItem().title("Quote").icon(CommentIcon).child(S.document().schemaType("footerQuote").title("Quote").documentId("footerQuote")),
              S.listItem().title("Listes de Navigation").icon(UlistIcon).child(S.document().schemaType("footerLists").title("Listes").documentId("footerLists")),
            ])
        ),
      S.divider(),

      // Legal documents probably not as list but as documetn
      // S.listItem()
      //   .title("Legal Documents")
      //   .icon(MasterDetailIcon)
      //   .child(
      //     S.document().schemaType("legalDoc").documentId("legalDoc"),
      //   ),
      // S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            // "contactPageGIS",
            "cpDetails",
            "cpTrustedBy",
            // "contactPageAOS",
            "cpNumbers",
            "footerLists",
            "cpForm",
            "nav",
            "footer",
            "hpAbout",
            "hpCTA",
            "hpHero",
            "hpValues",
            "hpNetwork",
            "shopSection",
            // "legalDoc",
            // "contactPagePFS",
            // "mainPageXXX",
            // "mainPageYYY",
          ].includes(listItem.getId())
      ),
    ]);
};
