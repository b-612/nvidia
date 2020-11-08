import validate from 'jquery-validation';

var forms = {
	validate: () => {
		$("form").each((i, el) => {
			var $form = $(el);

			$form.validate({
				errorElement: 'em',
				wrapper: 'label',
				invalidHandler: function () {

				},
				errorPlacement: function (error, element) {
					//just nothing, empty
				},
				highlight: (element, errorClass, validClass) => {
					$(element)
						.parent()
						.addClass(errorClass)
						.removeClass(validClass);
				},
				unhighlight: (element, errorClass, validClass) => {
					$(element)
						.parent()
						.removeClass(errorClass)
						.addClass(validClass);
				},
				submitHandler: (form) => {
					var data = $(form).serialize();

					$.ajax({
						type: "post",
						url: $(form).attr("action"),
						data: data,
						success: function (data) {
							$(form)[0].reset();
							$(form).find('label').removeClass('valid');
						},
					});
				},
				ignore: [],
				rules: {
					name: {
						required: true
					},
					email: {
						required: true,
						email: true
					}
				},
			});
		});
	},

	init: () => {
		forms.validate();
	},
};

export { forms };
