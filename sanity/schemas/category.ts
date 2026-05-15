export const categorySchema = {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: any) => Rule.required().min(2).max(80),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    },
    {
      name: "image",
      title: "Category image",
      type: "image",
      options: { hotspot: true },
      description:
        "Display image for category cards on the homepage and collection sections.",
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
  orderings: [
    {
      title: "Name, A–Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
};

