import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"

export default function NewsLanding() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=500&width=1000"
            alt="Featured Article"
            layout="fill"
            objectFit="cover"
            className="brightness-50"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Breaking News: Major Discovery in Science</h1>
            <p className="text-lg mb-2">Scientists make groundbreaking discovery that could change our understanding of the universe.</p>
            <time className="text-sm mb-4">{format(new Date(), "MMMM d, yyyy 'at' h:mm a")}</time>
            <Button variant="outline" className="w-fit">Read More</Button>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {[
            { id: 1, title: "Latest Development in Technology", date: new Date(2023, 10, 15, 14, 30) },
            { id: 2, title: "Global Economic Trends Shift", date: new Date(2023, 10, 15, 12, 45) },
            { id: 3, title: "Breakthrough in Renewable Energy", date: new Date(2023, 10, 15, 10, 15) },
          ].map((news) => (
            <Card key={news.id} className="w-full max-w-sm">
              <CardHeader>
                <Image
                  src={`/placeholder.svg?height=200&width=400&text=News+${news.id}`}
                  alt={`News ${news.id}`}
                  width={400}
                  height={200}
                  className="rounded-t-lg"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2">{news.title}</CardTitle>
                <p className="text-muted-foreground mb-2">New advancements are reshaping various industries...</p>
                <time className="text-sm text-muted-foreground">
                  {format(news.date, "MMMM d, yyyy 'at' h:mm a")}
                </time>
              </CardContent>
              <CardFooter>
                <Link href="#" className="text-primary hover:underline">Read full story</Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Popular Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {['Politics', 'Technology', 'Sports', 'Entertainment', 'Health', 'Science', 'Business', 'World'].map((category) => (
            <Button key={category} variant="outline" className="h-auto py-4">
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Subscribe to Our Newsletter</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col sm:flex-row gap-4">
              <Input type="email" placeholder="Enter your email" className="flex-grow" />
              <Button type="submit">Subscribe</Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}

