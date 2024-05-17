import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { Breadcrumb, 
         BreadcrumbItem,
         BreadcrumbLink,
         BreadcrumbList,
         BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";

export default function DetailChapter() {
    return (
        <main className="bg-[#1f1f1f] min-h-screen flex-grow">
            <Header/>
            <div className="container mx-auto px-4 pt-16 rounded bg-[#242526]">
                <div className="mb-[25px]">
                    <Breadcrumb className="">
                        <BreadcrumbList>
                            <BreadcrumbItem className="text-white">
                            <BreadcrumbLink className="hover:text-[#FFD700]" href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem className="text-[#ddd]">
                            <BreadcrumbLink className="hover:text-[#FFD700]" href="/filter">Tái Sinh Thành Quý Tộc Với Kĩ Năng 'Appraisal'</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem className="text-[#ddd]">
                            <BreadcrumbLink className="hover:text-[#FFD700]" href="/filter">Chapter 75</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="container mx-auto px-4 pt-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-white">
                                Tái Sinh Thành Quý Tộc Với Kĩ Năng 'Appraisal' - Chapter 75
                            </h1>
                            <p className= "text-white ml-4">cập nhật vào lúc 12:00</p>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-wrap justify-center">
                        <div className="flex flex-wrap justify-center">
                            <button className="bg-[#2f2f2f] text-white px-4 py-2 rounded mr-2">Server FREE</button>
                            <button className="bg-[#FFD700] text-black px-4 py-2 rounded">Server VIP</button>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-wrap justify-center">
                        <div className="flex items-center">
                            <button className="bg-[#F0AD4E] text-black px-4 py-2 rounded mr-2">Báo Lỗi Chương</button>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-wrap justify-center">
                        <div className="flex items-center">
                            <button className="bg-[#2f2f2f] text-white px-4 py-2 rounded mr-4 mb-5 hover:bg-[#FFD700]">Chap trước</button>
                            <select className="bg-[#2f2f2f] text-white px-20 py-2 rounded mr-4 mb-5">
                                <option value="Chapter1">Volume 1 - Chapter 1</option>
                                <option value="Chapter2">Volume 1 - Chapter 2</option>
                                <option value="Chapter3">Volume 1 - Chapter 3</option>
                                <option value="Chapter1">Volume 2 - Chapter 1</option>
                                <option value="Chapter2">Volume 2 - Chapter 2</option>
                                <option value="Chapter3">Volume 2 - Chapter 3</option>
                            </select>
                            <button className="bg-[#2f2f2f] text-white px-4 py-2 rounded mb-5 hover:bg-[#FFD700]">Chap sau</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* nội dung truyện */}
            <div className="container px-4 py-8 border border-[#2f2f2f] rounded mt-4">
                <p className="text-white text-bold">
                    Đây là nơi thêm API các truyện tranh 
                </p>
            </div>
            <div className="mt-4 flex flex-wrap justify-center">
                <div className="flex items-center">
                    <button className="bg-[#2f2f2f] text-white px-4 py-2 rounded mr-4 mb-5 hover:bg-[#FFD700]">Chap trước</button>
                        <select className="bg-[#2f2f2f] text-white px-20 py-2 rounded mr-4 mb-5">
                            <option value="Chapter1">Volume 1 - Chapter 1</option>
                            <option value="Chapter2">Volume 1 - Chapter 2</option>
                            <option value="Chapter3">Volume 1 - Chapter 3</option>
                            <option value="Chapter1">Volume 2 - Chapter 1</option>
                            <option value="Chapter2">Volume 2 - Chapter 2</option>
                            <option value="Chapter3">Volume 2 - Chapter 3</option>
                        </select>
                        <button className="bg-[#2f2f2f] text-white px-4 py-2 rounded mb-5 hover:bg-[#FFD700]">Chap sau</button>
                </div>
            </div>
            <Footer/>
        </main>
    );
}