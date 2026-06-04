export const CATEGORY_TREE = {
  rostro: {
    label: "Rostro",
    icon: "🧴",
    subcategories: [
      {
        slug: "bases",
        label: "Bases",
      },
      {
        slug: "correctores",
        label: "Correctores",
      },
      {
        slug: "polvos",
        label: "Polvos",
      },
      {
        slug: "contorno",
        label: "Contorno",
      },
      {
        slug: "rubor",
        label: "Rubor",
      },
      {
        slug: "iluminadores",
        label: "Iluminadores",
      },
    ],
  },

    cejas: {
    label: "Cejas",
    icon: "🧴",
    subcategories: [
      {
        slug: "lapiz",
        label: "Lápiz de cejas",
      },
      {
        slug: "gel",
        label: "Gel fijador",
      },
      {
        slug: "pomada",
        label: "Pomada",
      },
      {
        slug: "sombra Cejas",
        label: "Sombra de cejas",
      }
    ],
  },

  skincare: {
    label: "SkinCare",
    icon: "👁️",
    subcategories: [
            {
        slug: "cremas",
        label: "Cremas",
      },
      {
        slug: "limpiadores",
        label: "Limpiadores",
      },
      {
        slug: "hidratantes",
        label: "Hidratantes",
      },
      {
        slug: "serums",
        label: "Serums",
      },
    ],
  },

  ojos: {
    label: "Ojos",
    icon: "👁️",
    subcategories: [
      {
        slug: "paletas",
        label: "Paletas",
      },
      {
        slug: "delineadores",
        label: "Delineadores",
      }
    ],
  },

  labios: {
    label: "Labios",
    icon: "💄",
    subcategories: [
      {
        slug: "gloss",
        label: "Gloss",
      },
      {
        slug: "hidratante",
        label: "Hidratantes",
      },
    ],
  },
};

export const categories = Object.entries(CATEGORY_TREE).map(
  ([key, value]) => ({
    slug: key,
    label: value.label,
    icon: value.icon,
    subcategories: value.subcategories,
  })
);

export const CATEGORY_MAP = Object.fromEntries(
  categories.map((c) => [c.slug, c.label])
);