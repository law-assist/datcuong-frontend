import SearchList from "./components/Search";
import SearchBreadcrumb from "./components/SearchBreadcrumb";
import SearchFilter from "./components/SearchFilter";

/* eslint-disable @typescript-eslint/no-unused-vars */
type SearchPageProps = {
    searchParams: {
        q: string;
        page: string;
    };
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
    return (
        <div className="container mx-auto my-4 py-4" id="search-page">
            <div className="grid grid-cols-4 gap-1">
                <div className="col-span-3 bg-white py-2 rounded-3xl">
                    <SearchBreadcrumb />
                    <SearchList />
                </div>
                <div className="justify-self-end">
                    <SearchFilter />
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
