import { CustomPageProps } from "src/interfaces";
import { fetcher } from "src/libs/utils";
import useSWR from "swr";

const stringToDate = (dateString: string) => {
    const date = new Date(dateString);
    return date;
};

export default function DiagramPage({ params }: CustomPageProps) {
    const { id } = params;

    const path: string = `/law/${id.toString()}`;

    const {
        data: law,
        error,
        isLoading: swrLoading,
    } = useSWR(path, (url: string) => fetcher(url), {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    if (swrLoading) {
        return <div className="p-4">Vui lòng chờ...</div>;
    } else {
        if (!law || error) {
            return (
                <div className="p-4 italic">Không tìm thấy văn bản luật</div>
            );
        }
    }
    return (
        <div className="border border-primary w-full max-w-lg mx-auto p-4 rounded">
            <h5 className="text-center text-primary font-bold mb-2 w-full text-lg">
                Văn bản đang xem
            </h5>
            <table className="table-auto w-full border-collapse border border-gray-400 text-left">
                <tbody>
                    <tr>
                        <th
                            colSpan={2}
                            className="p-2 font-semibold text-primary"
                        >
                            {law.name}
                        </th>
                    </tr>
                    <tr>
                        <td className="font-bold border border-gray-400 p-2">
                            Số hiệu
                        </td>
                        <td className="border border-gray-400 p-2">
                            {law.numberDoc}
                        </td>
                    </tr>
                    <tr>
                        <td className="font-bold border border-gray-400 p-2">
                            Loại văn bản
                        </td>
                        <td className="border border-gray-400 p-2">
                            {law.category}
                        </td>
                    </tr>
                    <tr>
                        <td className="font-bold border border-gray-400 p-2">
                            Lĩnh vực, ngành
                        </td>
                        <td className="border border-gray-400 p-2">
                            {law.fields.join(", ")}
                        </td>
                    </tr>
                    <tr>
                        <td className="font-bold border border-gray-400 p-2">
                            Nơi ban hành
                        </td>
                        <td className="border border-gray-400 p-2">
                            {law.department}
                        </td>
                    </tr>
                    <tr>
                        <td className="font-bold border border-gray-400 p-2">
                            Ngày ban hành
                        </td>
                        <td className="border border-gray-400 p-2">
                            {stringToDate(law.dateApproved).toLocaleDateString(
                                "en-GB"
                            )}
                        </td>
                    </tr>
                    {/* <tr>
                        <td className="font-bold border border-gray-400 p-2">
                            Ngày hiệu lực
                        </td>
                        <td className="border border-gray-400 p-2 text-red-600">
                            Đã biết
                        </td>
                    </tr>
                    <tr>
                        <td className="font-bold border border-gray-400 p-2">
                            Tình trạng
                        </td>
                        <td className="border border-gray-400 p-2 text-red-600">
                            Đã biết
                        </td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    );
}
