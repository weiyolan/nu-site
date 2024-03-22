import { defineType, defineField } from 'sanity'
import {  uiLanguage } from '../supportedLanguages'
import { ChevronDown } from 'lucide-react';

export default defineType({
  title: 'Item',
  name: 'accordionItem',
  type: 'object',
  icon: ChevronDown,
  options: { collapsible: true, collapsed: false },
  preview: {
    select: {
      title: "title",
      description:'description',
    },
// 
    prepare(selection) {
      const { title, description } = selection;
      // console.log(image)
      return { title: title[uiLanguage.id], subtitle: description[uiLanguage.id] };
    },
  },
  fields: [
    defineField({
      name: 'title', title: uiLanguage.id==='en'?'Title':uiLanguage.id==='fr'?'Titre':'Titel', type: 'localeString',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description', title: uiLanguage.id==='en'?'Description':uiLanguage.id==='fr'?'Déscription':'Beschrijving', type: 'localeText', 
      // description: 'A simple description of what is shown on the picture for people using screenreaders.',
      validation: Rule => Rule.required()
    }),
  ]
})
