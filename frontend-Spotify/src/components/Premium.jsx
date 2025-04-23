import React from "react";

const Premium = () => {
    return (
        <div className="min-h-screen bg-[#121212] text-white font-sans">
            {/* ===== HEADER ===== */}
            <header className="bg-gradient-to-b from-purple-800 to-black pt-12 pb-16 px-4 text-center">
                <h1 className="text-2xl md:text-3xl font-extrabold leading-tight mb-3">
                    Listen without limits. Try 3 months of Premium Individual
                    for free.
                </h1>
                <p className="text-sm md:text-base text-gray-200 mb-6">
                    Only $119/month after. Cancel anytime.
                </p>
                <div className="flex flex-col md:flex-row gap-3 justify-center items-center mb-2">
                    <button className="cursor-pointer bg-white text-black font-semibold px-6 py-2 rounded-full hover:bg-gray-200 transition">
                        Get 3 months free
                    </button>
                    <button className="cursor-pointer border border-white text-white font-semibold px-6 py-2 rounded-full hover:bg-white hover:text-black transition">
                        See all plans
                    </button>
                </div>
                <p className="text-xs text-gray-400">
                    Not available to users who have already tried Premium.
                </p>
            </header>

            {/* ===== AFFORDABLE PLANS ===== */}
            <section className="text-center py-8 px-4">
                <h2 className="text-xl md:text-2xl font-bold mb-2">
                    Affordable plans for any situation
                </h2>
                <p className="text-sm md:text-base text-gray-300 max-w-xl mx-auto">
                    Choose a Premium plan that’s best for you. Listen to
                    millions of songs, anytime, anywhere.
                </p>
                <div className="flex flex-wrap gap-4 justify-center items-center mt-6">
                    {/* Thay link icon thanh toán tùy ý */}
                    <img
                        src="https://lubevan.ca/wp-content/uploads/2019/05/Download-Visa-Logo-PNG-Pic-1024x314.png"
                        alt="Visa"
                        className="h-6"
                    />
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
                        alt="MasterCard"
                        className="h-6"
                    />
                    <img
                        src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR-1024x800.png"
                        alt="GPay"
                        className="h-6"
                    />
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/3/39/PayPal_logo.svg"
                        alt="PayPal"
                        className="h-6"
                    />
                </div>
            </section>

            {/* ===== ALL PREMIUM PLANS INCLUDE ===== */}
            <section className="bg-[#1c1c1c] rounded-md mx-4 md:mx-8 lg:mx-16 px-6 md:px-10 py-8">
                <h3 className="text-xl font-bold mb-4">
                    All Premium plans include
                </h3>
                <div className="text-sm text-gray-100">
                    <div className="grid grid-cols-3">
                        <div className="flex items-start gap-2">
                            <span className="text-green-400">✓</span>
                            <span>Ad-free music listening</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-400">✓</span>
                            <span>Download to listen offline</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-400">✓</span>
                            <span>Play songs in any order</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-3">
                        <div className="flex items-start gap-2">
                            <span className="text-green-400">✓</span>
                            <span>High-quality audio</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-400">✓</span>
                            <span>Cancel anytime</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-400">✓</span>
                            <span>Group Session</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== PRICING CARDS ===== */}
            <section className="py-10 px-4 flex flex-col md:flex-row justify-center gap-6 flex-wrap">
                {/* MINI */}
                <div className="bg-[#1c1c1c] rounded-lg p-6 w-full md:w-72">
                    <h3 className="text-xl font-semibold text-green-400 mb-2">
                        Mini
                    </h3>
                    <p className="text-sm text-gray-300">From ₹7/day</p>
                    <ul className="mt-4 text-sm text-gray-100 space-y-1">
                        <li className="flex items-start gap-2">
                            <span className="text-green-400">✓</span>1 mobile
                            device only
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400">✓</span>Daily and
                            weekly plans
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400">✓</span>Ad-free
                            music listening
                        </li>
                    </ul>
                    <button className="cursor-pointer bg-green-500 hover:bg-green-600 w-full mt-4 py-2 rounded font-semibold text-black transition">
                        Get Premium Mini
                    </button>
                </div>

                {/* INDIVIDUAL */}
                <div className="bg-[#1c1c1c] rounded-lg p-6 w-full md:w-72 border border-purple-500">
                    <h3 className="text-xl font-semibold text-purple-400 mb-2">
                        Individual
                    </h3>
                    <p className="text-sm text-gray-300">₹119/month</p>
                    <p className="text-xs text-gray-400 mt-1">
                        First 3 months free for eligible users
                    </p>
                    <ul className="mt-4 text-sm text-gray-100 space-y-1">
                        <li className="flex items-start gap-2">
                            <span className="text-green-400">✓</span>1 account
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400">✓</span>Ad-free
                            music listening
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400">✓</span>Download to
                            listen offline
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400">✓</span>Play songs
                            in any order
                        </li>
                    </ul>
                    <button className="cursor-pointer bg-pink-400 hover:bg-pink-500 w-full mt-4 py-2 rounded font-semibold text-black transition">
                        Try 3 months free
                    </button>
                </div>

                {/* STUDENT */}
                <div className="bg-[#1c1c1c] rounded-lg p-6 w-full md:w-72 border border-blue-500">
                    <h3 className="text-xl font-semibold text-blue-400 mb-2">
                        Student
                    </h3>
                    <p className="text-sm text-gray-300">₹59/month</p>
                    <p className="text-xs text-gray-400 mt-1">
                        First 1 month free for eligible students
                    </p>
                    <ul className="mt-4 text-sm text-gray-100 space-y-1">
                        <li className="flex items-start gap-2">
                            <span className="text-green-400">✓</span>Discount
                            for eligible students
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400">✓</span>Ad-free
                            music listening
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400">✓</span>Download to
                            listen offline
                        </li>
                    </ul>
                    <button className="cursor-pointer bg-blue-400 hover:bg-blue-500 w-full mt-4 py-2 rounded font-semibold text-black transition">
                        Try 1 month free
                    </button>
                </div>
            </section>

            {/* ===== EXPERIENCE THE DIFFERENCE (COMPARISON TABLE) ===== */}
            <section className="text-center py-10 px-4">
                <h2 className="text-2xl font-bold">
                    Experience the difference
                </h2>
                <p className="text-sm text-gray-300 mt-2">
                    Compare the features of our Free and Premium plans.
                </p>
                <div className="overflow-x-auto mt-6 max-w-4xl mx-auto">
                    <table className="w-full border-collapse border border-gray-700 text-sm">
                        <thead className="bg-gray-800">
                            <tr>
                                <th className="p-3 text-left">Features</th>
                                <th className="p-3">Spotify Free</th>
                                <th className="p-3">Spotify Premium</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border border-gray-700">
                                <td className="p-3 text-left">
                                    Ad-free music listening
                                </td>
                                <td className="p-3 text-center text-red-400">
                                    ❌
                                </td>
                                <td className="p-3 text-center text-green-400">
                                    ✔
                                </td>
                            </tr>
                            <tr className="border border-gray-700">
                                <td className="p-3 text-left">
                                    Download songs
                                </td>
                                <td className="p-3 text-center text-red-400">
                                    ❌
                                </td>
                                <td className="p-3 text-center text-green-400">
                                    ✔
                                </td>
                            </tr>
                            <tr className="border border-gray-700">
                                <td className="p-3 text-left">
                                    High-quality audio
                                </td>
                                <td className="p-3 text-center text-red-400">
                                    ❌
                                </td>
                                <td className="p-3 text-center text-green-400">
                                    ✔
                                </td>
                            </tr>
                            <tr className="border border-gray-700">
                                <td className="p-3 text-left">
                                    Play in any order
                                </td>
                                <td className="p-3 text-center text-red-400">
                                    ❌
                                </td>
                                <td className="p-3 text-center text-green-400">
                                    ✔
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default Premium;
