import React from 'react'

const Footer = () => {
  return (
    <footer className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul>
                    <li className="mb-2"><a href="#" className="hover:underline">About Us</a></li>
                    <li className="mb-2"><a href="#" className="hover:underline">Careers</a></li>
                    <li className="mb-2"><a href="#" className="hover:underline">Blog</a></li>
                    <li className="mb-2"><a href="#" className="hover:underline">Press</a></li>
                </ul>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-4">Support</h3>
                <ul>
                    <li className="mb-2"><a href="#" className="hover:underline">Help Center</a></li>
                    <li className="mb-2"><a href="#" className="hover:underline">Safety Center</a></li>
                    <li className="mb-2"><a href="#" className="hover:underline">Community Guidelines</a></li>
                </ul>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul>
                    <li className="mb-2"><a href="#" className="hover:underline">Cookies Policy</a></li>
                    <li className="mb-2"><a href="#" className="hover:underline">Privacy Policy</a></li>
                    <li className="mb-2"><a href="#" className="hover:underline">Terms of Service</a></li>
                    <li className="mb-2"><a href="#" className="hover:underline">Law Enforcement</a></li>
                </ul>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-4 ">Follow Us</h3>
                <ul className="flex space-x-4 flex-col">
                    <li><a href="#" className="hover:underline">Facebook</a></li>
                    <li><a href="#" className="hover:underline">Twitter</a></li>
                    <li><a href="#" className="hover:underline">Instagram</a></li>
                    <li><a href="#" className="hover:underline">LinkedIn</a></li>
                </ul>
            </div>
        </div>
        <div className="text-center mt-8">
            <p>&copy; {new Date().getFullYear()}  Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer