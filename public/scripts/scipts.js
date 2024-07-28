function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

const successCallback = (position) => {
  $("#latitude").val(position.coords.latitude);
  $("#longitude").val(position.coords.longitude);
};

const errorCallback = (error) => {
  console.log(error);
};

$("#allowButton").on("click", getLocation);

$("#floatingSelect").on("change", function () {
  const selectedOption = $(this).find("option:selected");
  const value = selectedOption.attr("value");
  const bgColor = $(`.option-${value}`).css("background-color");
  $(this).css("background-color", bgColor);
});

function validateForm() {
  const date = $("#date").val();
  const time = $("#time").val();
  const skinType = $("#floatingSelect").val();
  const latitude = $("#latitude").val();
  const longitude = $("#longitude").val();

  if (!date || !time || !skinType || !latitude || !longitude) {
    alert("All fields must be filled out");
    return false;
  }
  return true;
}
