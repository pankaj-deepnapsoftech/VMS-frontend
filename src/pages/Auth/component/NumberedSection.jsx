// eslint-disable-next-line react/prop-types
export function NumberedSection({ number, title, description }) {
    return (
      <div className="flex-1 px-6">
        <div className="text-[120px] font-bold text-gray-900 leading-none">{number}</div>
        <h2 className="mt-6 text-3xl font-semibold leading-tight text-gray-900">{title}</h2>
        <p className="mt-6 text-base leading-7 text-gray-600">{description}</p>
      </div>
    );
  }