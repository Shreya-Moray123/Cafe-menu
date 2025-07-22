"use client"

import { motion } from "motion/react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { PlasticButton } from "@/components/ui/plastic-button"
import { useToast } from "@/hooks/use-toast"

const menuCategories = [
  {
    title: "Small Bites",
    description: "Perfect for a quick craving or to share with friends.",
    items: [
      {
        name: "Korean Bun",
        description:
          "A soft, golden Korean bun brushed with garlic butter or sweet cream, offering a warm, melt-in-the-mouth taste inspired by Seoul's street bakeries.",
        price: "₹160",
        image:
          "https://media.istockphoto.com/id/1862047625/photo/cream-cheese-garlic-bread.jpg?s=1024x1024&w=is&k=20&c=Ga9EZeUwS-9tuKSfy3lDuboTs1WRhuNBTVniZ_XNmFs=",
      },
      {
        name: "Chilli Korean Bun",
        description: "Selection of cured meats, cheeses, and marinated vegetables",
        price: "₹170",
        image: "https://media.istockphoto.com/id/657126420/photo/hands-of-female-staff-holding-sweet-food-with-tongs.jpg?s=1024x1024&w=is&k=20&c=-eMPelOql1WQiDQqAoOR-V0Cxkh-e6Bub3eDVALK_OY=",
      },
      {
        name: "CAULIFLOWER FLORETS",
        description: "Crispy golden cauliflower bites seasoned with special spices — a perfect crunchy snack!",
        price: "₹260",
        image: "https://media.istockphoto.com/id/678627586/photo/gobi-65.jpg?s=1024x1024&w=is&k=20&c=VTsydUoXFvHv4-7gOBZhi_78urnqN7iAF7kBNZp2DSE=",
      },
    ],
  },
  {
    title: "Wedges and Fries",
    description: "Crispy, golden, and perfectly seasoned potato bites served hot.",
    items: [
      {
        name: "POTATO WEDGES ",
        description: "Thick-cut potato wedges, crispy on the outside, soft inside, and seasoned to perfection!",
        price: "₹120",
        image: "https://media.istockphoto.com/id/1295967746/photo/baked-potato-wedges-in-a-cast-iron-skillet-with-ketchup-and-lemon-top-down-food-photo.jpg?s=1024x1024&w=is&k=20&c=PPONn_x19ekuJKnXfbjjH5vGgJwQ_ToVVc2LpaHjuJ0=",
      },
      {
        name: "CHILLI GARLIC WEDGES ",
        description: "wedges tossed in garlic & chilli",
        price: "₹150",
        image: "https://media.istockphoto.com/id/1251680036/photo/crispy-honey-chilli-potatoes-are-a-super-addictive-snack-from-indian-chinese-cuisine.jpg?s=1024x1024&w=is&k=20&c=0VikOfKXmftdfNNP6XdI7pkF237oKiThPpWo6LUPoy8=",
      },
      {
        name: "FRENCH FRIES",
        description: "Crispy golden French fries, perfectly salted and served with ketchup.",
        price: "₹120",
        image: "https://media.istockphoto.com/id/1443993866/photo/french-fries-with-ketchup-and-cocktail-sauce.jpg?s=1024x1024&w=is&k=20&c=OGs7oHi00W35Al-KcDi1-GeDhJPLyvFyT3sBC9EGufM=",
      },
    ],
  },
  {
    title: " S A N D W I C H E S",
    description: " CLASSIC BREAD/CROISSANT",
    items: [
      {
        name: "Veg Sandwich",
        description: "Fresh veggies layered with creamy spread and grilled to golden perfection — a classic, wholesome bite!",
        price: "₹120",
        image: "https://media.istockphoto.com/id/1328011797/photo/veg-grilled-sandwich.jpg?s=1024x1024&w=is&k=20&c=JT0r7F3hRFX-1XjHzXfxW0T3ZUwhm0AaMY5NdPxBBO8=",
      },
      {
        name: "Paneer Tikka Sandwich",
        description: "Spiced paneer grilled to perfection, served with tangy mint chutney.",
        price: "₹180",
        image: "https://media.istockphoto.com/id/1085142602/photo/paneer-tikka-sandwich-is-a-popular-indian-version-of-sandwich-using-cottage-cheese-curry-with.jpg?s=1024x1024&w=is&k=20&c=tCyCInkYHUyZccIyZwtSveJhzZ0uLBZrMXolSHqzJrc=",
      },
      {
        name: "Bombay Masala",
        description: "A spicy Mumbai-style sandwich stuffed with tangy potato masala, fresh veggies, and chutney — toasted to crispy perfection!",
        price: "₹180",
        image: "https://media.istockphoto.com/id/1329053226/photo/vada-pav.jpg?s=1024x1024&w=is&k=20&c=-t3d_TO9taj1t3-GwGcm0-1bRxxh1FcTVRnsreRGzx8=",
      },
    ],
  },
  {
    title: " D R I N K S",
    description: "Refreshing beverages",
    items: [
      {
        name: "BLUE CARACAO",
        description: "A vibrant, citrusy mocktail with a splash of orange flavor and a striking blue hue — cool, refreshing, and perfect for any mood!",
        price: "₹140",
        image: "https://media.istockphoto.com/id/1073914862/photo/icy-blue-lagoon-cocktail.jpg?s=1024x1024&w=is&k=20&c=81_wLh2lRjTB8Cs5_vQUd8FwsZJgJjoUwzE2RQD0Qb0=",
      },
      {
        name: " ICED AMERICANO ",
        description: "Rich espresso poured over ice with a splash of cold water",
        price: "₹120",
        image: "https://media.istockphoto.com/id/1345035853/photo/cold-brew-with-full-of-ice-and-black-straw-on-a-white-background-delicious-cold-beverage-with.jpg?s=1024x1024&w=is&k=20&c=tMqtrtL54jlWUsZ8tQ0_vcBBxdH0K24BW4xYbGAamsg=",
      },
      {
        name: "HAZELNUT COLD COFFEE",
        description: "A rich and creamy cold coffee infused with hazelnut flavor, topped with whipped cream.",
        price: "₹160",
        image: "https://media.istockphoto.com/id/1281119255/photo/mousse-sundae-in-glass-hazelnut-dessert.jpg?s=1024x1024&w=is&k=20&c=Xf7GXmYczaYPXKpmDDI8fJXiiaxC2v3_zkb1fSB1mTg=",
      },
    ],
  },
]

export default function MenuSection({ 
  onViewOrdersClick, 
  onAddToCart,
  onBuyNow 
}: { 
  onViewOrdersClick?: () => void
  onAddToCart?: (item: { name: string; description: string; price: string; image: string; category: string }) => void
  onBuyNow?: (item: { name: string; description: string; price: string; image: string; category: string }) => void
}) {
  const { toast } = useToast()
  
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
      // Show success toast
      toast({
        title: "Added to Cart!",
        description: `${item.name} has been added to your cart.`,
        duration: 3000,
        className: "bg-gradient-to-r from-purple-300 to-purple-400 text-white border-0 shadow-lg",
      })
    }
  }

  const handleBuyNow = (item: { name: string; description: string; price: string; image: string }, category: string) => {
    console.log(`Buy now clicked for ${item.name}`)
    if (onBuyNow) {
      onBuyNow({
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
              <div className="scale-150 transform origin-center">
                <PlasticButton text="View Items" onClick={onViewOrdersClick} />
              </div>
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
                        <div className="mt-4 space-y-2">
                          <Button
                            onClick={() => handleAddItem(item, category.title)}
                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-full py-3"
                          >
                            Add to Cart
                          </Button>
                          <Button
                            onClick={() => handleBuyNow(item, category.title)}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium rounded-full py-3"
                          >
                            Buy Now
                          </Button>
                        </div>
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
