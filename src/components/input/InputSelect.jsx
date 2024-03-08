import Select from "react-select";

const customStyles = {
    control: (provided, state) => ({
       ...provided,
       borderRadius: "8px",
    //    padding: "3px 7px",
       height: "2.8rem",
       border: state.isFocused
          ? "1px solid var(--purple)"
        //   : state.selectProps.error
        //   ? "2px solid red"
          : "1px solid var(--grey)", // Adjust border styles based on focus
       boxShadow: state.isFocused ? "0px 0px 32px 0px rgba(99, 60, 255, 0.25);" : "none", // Add shadow when focused
    //    "&:hover": {
    //       outlineColor: "#a17f5a", // Change border color on hover
    //    },
    }),
 
    option: (provided, state) => ({
       ...provided,
      
       backgroundColor: state.isSelected ? "#a17f5a" : "white",
       color: state.isSelected ? "white" : "black",
       // fontSize: "14px",
       borderBottom: "1px solid var(--grey)",
       height: "2.8rem",
       "&:hover": {
          backgroundColor: "#FAFAFA",
          color: "#000000",
          cursor: "pointer",
       },
    }),
 
    singleValue: (provided) => ({
       ...provided,
       fontSize: "14px", // Adjust font size of the selected value
    }),
 };

export default function InputSelect({
   errorMessage,
   options,
   label,
   field,
   onChange,
}) {
   const handleChange = (selectedOption) => {
      onChange(selectedOption);
   };
   return (
      <div className="pl-[1px] relative">
         <label className="text-dark-grey text-xs mb-1">
            {label}
            {errorMessage === "" ? "" : "*"}
         </label>

         <Select
            {...field}
            options={options}
            styles={customStyles}
            onChange={handleChange}
            error={errorMessage}
            classNamePrefix="modal-scroll"
         />
         <p className="text-red text-xs absolute top-[6px] right-0 font-medium">
            {errorMessage}
         </p>
      </div>
   );
}
