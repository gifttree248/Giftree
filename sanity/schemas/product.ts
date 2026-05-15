export const productSchema = {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required().min(3).max(120),
    },
    {
      name: "shortDescription",
      title: "Short Description",
      type: "string",
      description: "A short one-line description shown on product cards",
      validation: (rule: { max: (length: number) => unknown }) =>
        rule.max(120),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt text",
              type: "string",
              description: "Short description for accessibility and SEO.",
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.min(1),
    },
    {
      name: "lifestyleImage",
      title: "Lifestyle image",
      type: "image",
      options: { hotspot: true },
      description:
        "Wider editorial shot for large grid cells. Optional; falls back to the main product image.",
      fields: [
        {
          name: "alt",
          title: "Alt text",
          type: "string",
        },
      ],
    },
    {
      name: "internalViewImage",
      title: "Internal / detail view",
      type: "image",
      options: { hotspot: true },
      description:
        "Secondary shot revealed on hover (e.g. inside the hamper). Optional; otherwise the second gallery image is used when present.",
      fields: [
        {
          name: "alt",
          title: "Alt text",
          type: "string",
        },
      ],
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "isFeatured",
      title: "Featured product",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "price",
      title: "Price (USD)",
      type: "number",
      description: "Display price in USD. Optional.",
    },
    {
      name: "brochurePdf",
      title: "Brochure (PDF)",
      type: "file",
      options: {
        accept: ".pdf",
      },
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "images.0",
      category: "category.name",
    },
    prepare(selection: any) {
      const { title, media, category } = selection;
      return {
        title,
        media,
        subtitle: category ? `Category: ${category}` : undefined,
      };
    },
  },
};

