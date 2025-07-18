"use client"

import { motion } from "motion/react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { PlasticButton } from "@/components/ui/plastic-button"

const menuCategories = [
  {
    title: "Small Bites",
    description: "Perfect for a quick craving or to share with friends.",
    items: [
      {
        name: "Korean Bun",
        description:
          "A soft, golden Korean bun brushed with garlic butter or sweet cream, offering a warm, melt-in-the-mouth taste inspired by Seoul's street bakeries.",
        price: "$12",
        image:
          "https://media.istockphoto.com/id/1862047625/photo/cream-cheese-garlic-bread.jpg?s=1024x1024&w=is&k=20&c=Ga9EZeUwS-9tuKSfy3lDuboTs1WRhuNBTVniZ_XNmFs=",
      },
      {
        name: "Chilli Korean Bun",
        description: "Selection of cured meats, cheeses, and marinated vegetables",
        price: "$18",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop",
      },
      {
        name: "Caprese Salad",
        description: "Fresh mozzarella, tomatoes, and basil with balsamic glaze",
        price: "$14",
        image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=300&h=200&fit=crop",
      },
    ],
  },
  {
    title: "Primi Piatti",
    description: "Pasta and risotto dishes",
    items: [
      {
        name: "Spaghetti Carbonara",
        description: "Classic Roman pasta with eggs, pancetta, and pecorino cheese",
        price: "$22",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=200&fit=crop",
      },
      {
        name: "Risotto ai Funghi",
        description: "Creamy arborio rice with wild mushrooms and truffle oil",
        price: "$26",
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=300&h=200&fit=crop",
      },
      {
        name: "Lasagna della Casa",
        description: "Homemade lasagna with meat sauce, béchamel, and mozzarella",
        price: "$24",
        image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=300&h=200&fit=crop",
      },
    ],
  },
  {
    title: "Secondi Piatti",
    description: "Main courses",
    items: [
      {
        name: "Osso Buco alla Milanese",
        description: "Braised veal shanks with saffron risotto",
        price: "$38",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop",
      },
      {
        name: "Branzino al Sale",
        description: "Mediterranean sea bass baked in sea salt crust",
        price: "$32",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=300&h=200&fit=crop",
      },
      {
        name: "Bistecca alla Fiorentina",
        description: "Grilled T-bone steak with rosemary and olive oil",
        price: "$45",
        image: "https://images.unsplash.com/photo-1558030006-450675393462?w=300&h=200&fit=crop",
      },
    ],
  },
  {
    title: "Dolci",
    description: "Traditional desserts",
    items: [
      {
        name: "Tiramisu",
        description: "Classic coffee-flavored dessert with mascarpone",
        price: "$12",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=200&fit=crop",
      },
      {
        name: "Panna Cotta",
        description: "Silky vanilla custard with berry compote",
        price: "$10",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=200&fit=crop",
      },
      {
        name: "Cannoli Siciliani",
        description: "Crispy shells filled with sweet ricotta and chocolate chips",
        price: "$14",
        image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=200&fit=crop",
      },
    ],
  },
]

export default function MenuSection({ 
  onViewOrdersClick, 
  onAddToCart 
}: { 
  onViewOrdersClick?: () => void
  onAddToCart?: (item: { name: string; description: string; price: string; image: string; category: string }) => void
}) {
  console.log("MenuSection rendered with onViewOrdersClick:", onViewOrdersClick)
  console.log("onViewOrdersClick type:", typeof onViewOrdersClick)
  
  const handleAddItem = (item: { name: string; description: string; price: string; image: string }, category: string) => {
    console.log(`Adding ${item.name} to cart`)
    if (onAddToCart) {
      onAddToCart({
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        category: category
      })
    }
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 relative"
        >
          <div className="flex justify-center items-center relative mb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">Our Menu</h2>
            <div className="absolute right-0 top-0">
              <PlasticButton text="View Items" onClick={onViewOrdersClick} />
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of authentic Italian dishes, prepared with the finest ingredients
            and traditional techniques.
          </p>
        </motion.div>
        <div className="space-y-16">
          {menuCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-amber-600 mb-2">{category.title}</h3>
                <p className="text-gray-600 italic">{category.description}</p>
                <Separator className="w-24 mx-auto mt-4 bg-amber-200" />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300 group flex flex-col">
                      <div className="relative overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-3 right-3 bg-amber-600 hover:bg-amber-700">{item.price}</Badge>
                      </div>
                      <CardHeader className="flex-1 flex flex-col">
                        <CardTitle className="text-xl text-gray-800">{item.name}</CardTitle>
                        <CardDescription className="text-gray-600 flex-1">{item.description}</CardDescription>
                        <Button
                          onClick={() => handleAddItem(item, category.title)}
                          className="mt-4 bg-red-600 hover:bg-red-700 text-white font-medium"
                        >
                          Add Item
                        </Button>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
