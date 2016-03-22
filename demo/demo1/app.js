(function() {
    var init = function() {
        var orderForm = document.forms.order,
            saveBtn = document.getElementById('saveOrder'),
            saveBtnClicked = false;
        var saveForm = function() {
            if (!('formaction' in document.createElement('input'))) { //检查浏览器是否支持formaction属性
                var formAction = saveBtn.getAttribute('formAction');
                orderForm.setAttribute('action', formAction);
            }
            saveBtnClicked = true;
        };
        saveBtn.addEventListener('click', saveForm, false);
        var qtyFields = orderForm.quantity,
            totalFields = document.getElementsByClassName('item_total'),
            orderTotalField = document.getElementById('order_total');
        var formatMoney = function(value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        var calculateTotals = function() {
            var i = 0,
                ln = qtyFields.length,
                itemQty = 0,
                itemPrice = 0.00,
                itemTotal = 0.00,
                itemTotalMoney = '$0.00',
                orderTotal = 0.00,
                orderTotalMoney = 0.00;
            for (; i < ln; i++) {
                if (!!qtyFields[i].valueAsNumber) {
                    itemQty = qtyFields[i].valueAsNumber || 0;
                } else {
                    itemQty = parseFloat(qtyFields[i].value) || 0;
                }
                if (!!qtyFields[i].dataset) {
                    itemPrice = parseFloat(qtyFields[i].dataset.price);
                } else {
                    itemPrice = parseFloat(qtyFields[i].getAttribute('data-price'));
                }
                itemTotal = itemQty * itemPrice;
                itemTotalMoney = '$' + formatMoney(itemTotal.toFixed(2));
                orderTotal += itemTotal;
                orderTotalMoney = '$' + formatMoney(orderTotal.toFixed(2));
                if (!!totalFields[i].value) {
                    totalFields[i].value = itemTotalMoney;
                    orderTotalField.value = orderTotalMoney;
                } else {
                    totalFields[i].innerHTML = itemTotalMoney;
                    orderTotalField.innertHTML = orderTotalMoney;
                }
            }
        };
        calculateTotals();
        var qtyListeners = function() {
            var i = 0,
                ln = qtyFields.length;
            for (; i < ln; i++) {
                qtyFields[i].addEventListener('input', calculateTotals, false);
                qtyFields[i].addEventListener('keyup', calculateTotals, false);
            }
        };
        qtyListeners();

        var doCustomValidity = function(field, msg) {
            if ('setCustomValidity' in field) {
                field.setCustomValidity(msg)
            } else {
                field.validationMessage = msg;
            }
        };
        var validateForm = function() {
            doCustomValidity(orderForm.name, '');
            doCustomValidity(orderForm.password, '');
            doCustomValidity(orderForm.confirm_password, '');
            doCustomValidity(orderForm.card_name, '');
            if (orderForm.name.value.length < 4) {
                doCustomValidity(orderForm.name, "名字没有超过4个字符");
            }
            if (orderForm.password.value.length < 8) {
                doCustomValidity(orderForm.password, "密码小于8个字符");
            }
            if (orderForm.password.value != orderForm.confirm_password.value) {
                doCustomValidity(orderForm.confirm_password, "确认密码和密码不一致");
            }
        }
        orderForm.addEventListener('input', validateForm, false);
        orderForm.addEventListener('keyup', validateForm, false);
        var styleInvalidForm = function() {
            orderForm.className = 'invalid';
        };
        orderForm.addEventListener('invalid', styleInvalidForm, false);
        Modernizr.load({
            test:Modernizr.inputtypes.month,
            nope:'monthpicker.js'
        })
    };
    window.addEventListener('load', init, false);
})();
