/* eslint-disable react/prop-types */

export default function RadioBtn({ title, className, id, value, labelFor, checked, onChange }) {
  return (
    <div className="flex items-center mr-4">
      <input id={id} value={value} checked={checked} onChange={onChange} name="colored-radio" type="radio" className={className} />
      <label htmlFor={labelFor} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {title}
      </label>
    </div>
  );
}
