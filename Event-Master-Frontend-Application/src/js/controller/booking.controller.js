document.addEventListener("DOMContentLoaded", function () {
    getBookingSlot();
    getNextBookingId();
});



function clear(){
    $('#userID').val(null);
    $('#userName').val(null);
    $('#total_booking').val(null);
}

function getNextBookingId() {
    const nextBookingIdURL = `http://localhost:8800/api/booking-id-count`;
    try {
        $.ajax({
            method: "GET",
            url: nextBookingIdURL,
            async: true,
            dataType: 'json',
            success: function (response) {
                if (response) {
                    var slots = document.getElementById("booking_id");
                    slots.setAttribute('value', response);
                } else {
                }
            }
        });

    } catch (ex) {

    }
    setTimeout(getNextBookingId, 1000);

}

function getBookingSlot() {
    const getBookingSlotURL = `http://localhost:8800/api/booking-slot-tot`;
    try {
        $.ajax({
            method: "GET",
            url: getBookingSlotURL,
            async: true,
            dataType: 'json',
            success: function (response) {
                if (response) {
                    var slots = document.getElementById("available_tick");
                    slots.setAttribute('value', response);
                } else {
                }
            }
        });
    } catch (ex) {
    }
    setTimeout(getBookingSlot, 1000);

}

$('#btnBookingNow').click(function () {
    bookingSave();
});

function updateSlot() {
    try {
        const updateSlotAvailable = `http://localhost:8800/api/booking-slot-update/1`;

        let slotTot = $('#available_tick').val();
        let totBooking = $('#total_booking').val();
        let newValue = Number(slotTot) - Number(totBooking);

        try {
            fetch(updateSlotAvailable, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    '_id': 1,
                    'availableSlot': newValue,
                }),
            }).then(r => {
                getNextBookingId();
                getBookingSlot();
                clear();
            });
        } catch (ex) {
        }
    } catch (ex) {
    }
}

function bookingSave() {

    let bookingID = $('#booking_id').val();
    let userId = $('#userID').val();
    let userName = $('#userName').val();
    let totBooking = $('#total_booking').val();

    const bookingSaveURL = `http://localhost:8800/api/booking-save`;

    $.ajax({
        method: "POST",
        url: bookingSaveURL,
        dataType: 'Json',
        async: true,
        contentType: "application/json",
        data: JSON.stringify({
            _id: bookingID,
            user_id: userId,
            user_name: userName,
            total_booking: totBooking
        }),
        success: function (res) {
            if (res.message === 'Booking Added!') {
                alert("Booking Now!")
                updateSlot();
            } else {
                alert("Booking Fail!")
            }

        },
        error: function (ob, textStatus, error) {
        }
    });
}