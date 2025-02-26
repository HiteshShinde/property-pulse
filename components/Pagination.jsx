import Link from "next/link";

const Pagination = ({ page, pageSize, totalItems }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      {page > 1 ? (
        <Link
          href={`/properties?page=${page - 1}`}
          className="mr-2 px-2 py-1 border border-gray-300 rounded bg-white hover:bg-gray-100"
        >
          Prev
        </Link>
      ) : null}

      <span className="text-gray-600 mx-2">
        {page} / {totalPages}
      </span>

      {page < totalPages ? (
        <Link
          href={`/properties?page=${page + 1}`}
          className="ml-2 px-2 py-1 border border-gray-300 rounded bg-white hover:bg-gray-100"
        >
          Next
        </Link>
      ) : null}
    </section>
  );
};

export default Pagination;
