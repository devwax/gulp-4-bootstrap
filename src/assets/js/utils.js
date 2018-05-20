// Form submit handler functions
function submitRequest(email, fname, lname) {
  var requestData = { "email": email, "first_name": fname, "last_name": lname };
  $.ajax({
    method: "GET",
    url: "https://hook.io/smonsen/request-access",
    data: requestData,
    dataType: 'json'
  }).done(function( msgObj ) {
    var response = getResponseText(msgObj);
    setValidationMessage(response.text, response.type);

    $('.request-access-button').removeClass('disabled-button');
  });
}

function setValidationMessage(msg, type) {

  if (msg) {
    $('#validationMessage p.message').html(msg);
    $('#validationMessage').css('display', 'block');
  }

  if (type === 'success') {
    $('.form__email').val('').blur();
    $('.form__email').css('border-color', 'inherit');
  }

  if (type === 'error') {
    $('.form__email').css('border-color', 'red');
  }
}

function resetValidationMessage() {
  $('#validationMessage').css('display', 'none');
  $('#validationMessage p.message').val('')
}

function getResponseText(response) {
  var responseText = '';
  var responseType = '';

  if (response.hasOwnProperty('errors')) { // Error
    for (var prop in response.errors) {
      if (response.errors.hasOwnProperty(prop)) {
        response.errors[prop].map(function (errorMessage) {
          responseText += prop + ' ' + errorMessage + '. ';
          responseType = 'error';
        })
      }
    }
  } else if (response.hasOwnProperty('customer')) { // Success
    responseType = 'success';
    responseText = 'Success! You\'ve been added to the request list. We will contact you shortly with instructions to proceed.'

  }

  return { type: responseType, text: responseText };
}

/*
// Bootstrap HTML form validation
window.addEventListener('load', function() {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.getElementsByClassName('needs-validation');
  // Loop over them and prevent submission
  const validation = Array.prototype.filter.call(forms, function(form) {
    form.addEventListener('submit', function(event) {
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');

      // If the form fields are all valid...
      if (form.checkValidity() === true) {
        // alert('Valid form... submitted!')
        //

      }
      // Comment this out of you want the submit button to cause the form to be submitted normally via POST
      event.preventDefault();
    }, false);
  });
}, false);
*/

function generateFormEmailLink(el, to_email, subject) {
  if (!el) {
    console.log('Error: No form element specified!');
    return;
  }
  if (!to_email) {
    console.log('Error: No "To" email address specified!');
    return;
  }

  if (!subject) {
    subject = "New Reservation";
  }

  const first_name = $('[name="first_name"]').val();
  const last_name = $('[name="last_name"]').val();
  const number_of_guests = $('[name="number_of_guests"]').val();
  const state = $('[name="state"]').val();
  const zip_code = $('[name="zip_code"]').val();
  const email = $('[name="email"]').val();
  const phone_number = $('[name="phone_number"]').val();
  const reservation_date = $('[name="reservation_date"]').val();
  const additional_info = $('[name="additional_info"]').val();

const message = `
Reservation Details:
=========================================
First Name: ${first_name}
Last Name: ${last_name}
Number of Guests: ${number_of_guests}
State: ${state}
Zip Code: ${zip_code}
Email: ${email}
Phone Number: ${phone_number}
Reservation Date: ${reservation_date}
Additional Info: ${additional_info}
`;

  const mailto_link = `mailto:${to_email}?subject=${subject}&body=${message}`;
  // console.log(encodeURI(mailto_link));
  console.log('phone_number', phone_number);

  $(el).attr('href', encodeURI(mailto_link))

}
