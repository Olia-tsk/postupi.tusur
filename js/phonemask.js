jQuery(function ($) {
    $.mask.definitions["9"] = "";
    $.mask.definitions["n"] = "[0-9]";

    function customMask(countryInputId, phoneInputId) {
        let countryInput = $("#" + countryInputId);
        let phoneInput = $("#" + phoneInputId);

        function changeMask() {
            switch (countryInput.val()) {
                case "ru":
                case "kz":
                    phoneInput.mask("+7 (nnn) nnn-nn-nn");
                    break;
                case "kg":
                    phoneInput.mask("+996 (nnn) nnn-nnn");
                    break;
                case "uz":
                    phoneInput.mask("+998 (nn) nnn-nnnn");
                    break;
                case "tg":
                    phoneInput.mask("+992 (nn) nnn-nnnn");
                    break;
                case "tr":
                    phoneInput.mask("+993 (nn) nnn-nnn");
                    break;
                case "other":
                    phoneInput.mask("+n (nnn) nnn-nn-nn nn");
                    break;
            }
        }

        changeMask();
        countryInput.on("change", function () {
            changeMask();
        });
    }

    customMask("country_one", "phone_one");
    customMask("country_two", "phone_two");
    customMask("country_three", "phone_three");
    customMask("country_four", "phone_four");
    customMask("country_five", "phone_five");
    customMask("country_six", "phone_six");
    customMask("country_seven", "phone_seven");
    customMask("country_eight", "phone_eight");
    customMask("country_nine", "phone_nine");
    customMask("country_ten", "phone_ten");
    customMask("country_eleven", "phone_eleven");
    customMask("country_twelve", "phone_twelve");
});
