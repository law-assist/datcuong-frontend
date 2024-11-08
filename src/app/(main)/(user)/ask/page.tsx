"use server";
import AskForm from "./components/AskForm";
import AskList from "./components/AskList";

async function Page() {
    // const requests = await getReQuest();
    return (
        <div className="py-4 xl:py-8">
            <div className="p-4 xl:px-8 bg-white rounded-lg">
                <h4 className="font-bold">Hỏi luật sư</h4>
                <p className="italic pt-2 pb-4">
                    Hỏi Luật sư cho phép bạn nhận được câu trả lời miễn phí từ
                    các luật sư trong cho các câu hỏi pháp lý cơ bản về nhiều
                    chủ đề khác nhau, bao gồm luật gia đình, luật đất đai, luật
                    lao động, luật hình sự,...
                </p>
                <AskForm></AskForm>
            </div>
            <AskList></AskList>
        </div>
    );
}

export default Page;
