

const SectionTitle = ({subHeading, heading}) => {
    return (
        <div className="mx-auto md:w-1/4 text-center mt-14 mb-10">
            <p className="text-yellow-600 mb-2">--- {subHeading} ---</p>
            <h3 className="text-3xl font-bold uppercase border-y-4 py-3">{heading}</h3>
        </div>
    );
};

export default SectionTitle;