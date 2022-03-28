const formValidation = (
  cityRef,
  streetRef,
  houseRef,
  deliveryDateRef,
  deliveryHour,
  creditCardRef,
  creditCardExpRef,
  cvvRef,
  creditCardOwnerRef
) => {
  cityRef.current.style.border = "2px solid black";
  streetRef.current.style.border = "2px solid black";
  houseRef.current.style.border = "2px solid black";
  deliveryDateRef.current.style.border = "2px solid black";
  deliveryHour.current.style.border = "2px solid black";
  creditCardRef.current.style.border = "2px solid black";
  creditCardExpRef.current.style.border = "2px solid black";
  cvvRef.current.style.border = "2px solid black";
  creditCardOwnerRef.current.style.border = "2px solid black";

  if (cityRef.current.value === "") {
    cityRef.current.style.border = "2px solid red";
  }
  if (streetRef.current.value === "") {
    streetRef.current.style.border = "2px solid red";
  }
  if (houseRef.current.value === "") {
    houseRef.current.style.border = "2px solid red";
  }
  if (deliveryDateRef.current.value === "") {
    deliveryDateRef.current.style.border = "2px solid red";
  }
  if (creditCardRef.current.value === "") {
    creditCardRef.current.style.border = "2px solid red";
  }
  if (creditCardExpRef.current.value === "") {
    creditCardExpRef.current.style.border = "2px solid red";
  }
  if (cvvRef.current.value === "") {
    cvvRef.current.style.border = "2px solid red";
  }
  if (creditCardOwnerRef.current.value === "") {
    creditCardOwnerRef.current.style.border = "2px solid red";
  }
};

export default formValidation;
