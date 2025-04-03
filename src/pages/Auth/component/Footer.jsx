import { Link } from "react-router-dom";
import { Facebook, Linkedin } from "lucide-react"
const Footer = () => {
    return (
        <>
            <footer className="bg-[#050A1A] text-white py-12 px-4 md:px-8 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                        {/* Logo and Description */}
                        <div className="lg:col-span-1">
                            <div className="mb-6">
                                <Link to="/" className="flex items-center">
                                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">
                                        Secure&
                                    </span>
                                </Link>
                            </div>
                            <p className="text-gray-400 mb-6 max-w-xs">
                                Discover the hacker that best suits your needs within a matter of hours.
                            </p>
                            <div className="flex space-x-4">
                                <Link href="#" className="hover:text-gray-300 transition-colors">

                                    <Facebook className="w-5 h-5" />
                                    <span className="sr-only">Facebook</span>
                                </Link>
                                <Link href="#" className="hover:text-gray-300 transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                    <span className="sr-only">LinkedIn</span>
                                </Link>
                            </div>
                        </div>

                        {/* Platform */}
                        <div className="lg:col-span-1">
                            <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">Platform</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                        How it works
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                        Integrations
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Solutions */}
                        <div className="lg:col-span-1">
                            <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">Solutions</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                        Pentesting
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                        Tools
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                        Compliance
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                        Zerod Enterprise
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Know More */}
                        <div className="lg:col-span-1">
                            <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">Know More</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                        Pricing
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                        Ethical Hackers
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div className="lg:col-span-1">
                            <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">Company</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                        Hack with us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                        Partner with us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-gray-400">
                        <p>
                            2025  Secure& - All rights reserved. ©
                            <Link href="#" className="text-red-500 hover:text-red-400 ml-1">
                                Terms & Conditions
                            </Link>
                            <span className="mx-1">-</span>
                            <Link href="#" className="text-red-500 hover:text-red-400">
                                Privacy Policy
                            </Link>
                        </p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;