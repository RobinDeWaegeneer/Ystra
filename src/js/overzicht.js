var cart = JSON.parse(localStorage.getItem("cart")) || [];
  var cartTableBody = document.getElementById("cart-table-body");
  var totalCost = document.getElementById("total-cost");

  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    (function(product) {
      var tr = document.createElement("tr");

      var productNameTd = document.createElement("td");
      productNameTd.textContent = product.name;
      tr.appendChild(productNameTd);

      var productQuantityTd = document.createElement("td");
      var quantityForm = document.createElement("form");
      var quantityInput = document.createElement("input");
      quantityInput.setAttribute("type", "number");
      quantityInput.setAttribute("value", product.quantity);
      quantityInput.setAttribute("min", 1);
      quantityInput.setAttribute("step", 0.01);
      quantityForm.appendChild(quantityInput);
      productQuantityTd.appendChild(quantityForm);
      tr.appendChild(productQuantityTd);

      var productPriceTd = document.createElement("td");
      productPriceTd.textContent = product.price;
      tr.appendChild(productPriceTd);

      var productTotalTd = document.createElement("td");
      productTotalTd.textContent =
        parseFloat(product.quantity) * parseFloat(product.price.substring(1));
      tr.appendChild(productTotalTd);

      total += parseFloat(product.quantity) * parseFloat(product.price.substring(1));

      var removeTd = document.createElement("td");
      var removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", function() {
        var index = cart.indexOf(product);
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
      });
      removeTd.appendChild(removeButton);
      tr.appendChild(removeTd);

      cartTableBody.appendChild(tr);

      quantityInput.addEventListener("change", function() {
        product.quantity = this.value;
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
      });
    })(cart[i]);
  }

  totalCost.textContent = "Total cost: $" + total;