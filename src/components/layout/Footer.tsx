import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 justify-items-center">
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4 text-red-600">Компания</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-gray-900">О нас</Link></li>
              <li><Link href="/careers" className="hover:text-gray-900">Careers</Link></li>
              <li><Link href="/press" className="hover:text-gray-900">Press</Link></li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4 text-red-600">Продукты</h3>
            <ul className="space-y-2">
              <li><Link href="/products/software" className="hover:text-gray-900">Software</Link></li>
              <li><Link href="/products/hardware" className="hover:text-gray-900">Hardware</Link></li>
              <li><Link href="/products/services" className="hover:text-gray-900">Services</Link></li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4 text-red-600">Ресурсы</h3>
            <ul className="space-y-2">
              <li><Link href="/blog" className="hover:text-gray-900">Blog</Link></li>
              <li><Link href="/documentation" className="hover:text-gray-900">Documentation</Link></li>
              <li><Link href="/support" className="hover:text-gray-900">Support</Link></li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4 text-red-600">Контакты</h3>
            <div className="flex justify-center space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900">
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900">
                <Twitter size={24} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900">
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900">
                <Linkedin size={24} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p>&copy;{new Date().getFullYear()} globalNews. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
