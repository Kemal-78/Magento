/// <reference types="cypress" />

import { faker } from "@faker-js/faker/locale/fr";

let randomUserMail = faker.internet.email();
let randomFirstName = faker.name.firstName();
let randomLastName = faker.name.lastName();
let randomAdress = faker.address.streetAddress();
let randomCity = faker.address.city();
let randomPhoneNumber = faker.phone.number("06########");

let randomUserMailBill = faker.internet.email();
let randomFirstNameBill = faker.name.firstName();
let randomLastNameBill = faker.name.lastName();
let randomAdressBill = faker.address.streetAddress();
let randomCityBill = faker.address.city();
let randomPhoneNumberBill = faker.phone.number("06########");

describe("Soutenance", () => {
  before(() => {
    cy.visit("https://magento.softwaretestingboard.com/");
    cy.url().should("contain", "https://magento.softwaretestingboard.com");
  });

  it("Ajout d'un article au panier", () => {
    cy.get("#ui-id-4").click();
    cy.url().should("contain", "/women.html");
    cy.get("dd > .items > :nth-child(1) > a").click();
    cy.url().should("contain", "/women/tops-women.html");
    cy.get('[class="item product product-item"]')
      .first()
      .find('[id="option-label-size-143-item-167"]')
      .click();
    cy.get('[class="item product product-item"]')
      .first()
      .find('[id="option-label-color-93-item-60"]')
      .click();
    cy.get('[class="action tocart primary"]').first().click({ force: true });
    cy.get('[class="counter qty"]').should("be.visible");
  });

  it("Modifier le nombre d'articles au panier", () => {
    cy.addtocart();
    cy.get('[class="action showcart"]').click({ force: true });
    //cy.get('[id="ui-id-1"]').should("be.visible");
    cy.get('[class="action edit"]').click({ force: true });
    cy.url().should("contain", "/product_id/1812/");
    cy.get('input[name="qty"]').clear();
    cy.get('input[name="qty"]').type("5");
    cy.get("#product-updatecart-button").click();
    cy.get("#option-label-size-143-item-167").click({ force: true });
    cy.get("#option-label-color-93-item-60").click({ force: true });
    cy.get("#product-updatecart-button").click();
    //cy.get('[class="message-success success message"]').should("be.visible");
    cy.url().should("contain", "/checkout/cart/");
  });

  it.only("Checkout - Adresses d'envoi et facturation identiques", () => {
    //ADD TO CART
    cy.addtocart();
    //PROCEED TO CART FROM SIDE PANEL
    cy.get('[class="action showcart"]').click({ force: true });
    cy.wait(2000);
    cy.get('[class="action viewcart"]').click();
    cy.wait(5000);
    cy.url().should("contain", "/checkout/cart/");
    //PROCEED TO CHECKOUT FROM CART
    cy.get('[class="action primary checkout"]').eq(1).click();
    cy.wait(5000);
    cy.url().should("contain", "/checkout/#shipping");
    //FILLING CUSTOMER INFORMATIONS
    cy.get("#customer-email").type(randomUserMail);
    cy.get('input[name="firstname"]').type(randomFirstName);
    cy.get('input[name="lastname"]').type(randomLastName);
    cy.get('input[name="company"]').type("Microsoft");
    cy.get('input[name="street[0]"]').type(randomAdress);
    cy.get('input[name="city"]').type(randomCity);
    //cy.get(".select").eq(0).select("Paris").should("have.value", "Paris");
    cy.get('select[name="region_id"]')
      .select("Paris")
      .should("have.value", "Paris");
    cy.get('input[name="postcode"]').type("12345");
    cy.get('select[name="country_id"]')
      .select("France")
      .should("have.value", "France");
    cy.get('input[name="telephone"]').type(randomPhoneNumber);
    //SELECT SHIPPING METHOD
    cy.get('[class="radio"]').first().click();
    //REVIEW & PAYMENT
    cy.get('[class="button action continue primary"]').click();
    cy.url().should("contain", "/checkout/#payment");
    cy.get('[class="billing-address-details"]')
      .should("have.value", randomUserMail)
      .and("have.value", randomFirstName)
      .and("have.value", randomLastName)
      .and("have.text", "Microsoft")
      .and("have.value", randomAdress)
      .and("have.text", "France")
      .and("have value", randomPhoneNumber);
    cy.get('[class=shipping-information-content"]')
      .should("have.value", randomUserMail)
      .and("have.value", randomFirstName)
      .and("have.value", randomLastName)
      .and("have.text", "Microsoft")
      .and("have.value", randomAdress)
      .and("have.text", "France")
      .and("have value", randomPhoneNumber);
    //VALIDATION
    cy.get('[class="action primary checkout"]').click();
    cy.url().should("contains", "/checkout/onepage/success/");
    cy.get('[class="checkout-success"]').should("be.visible");
  });

  it("Checkout - Adresses d'envoi et facturation différentes", () => {
    //ADD TO CART
    cy.addtocart();
    //PROCEED TO CART FROM SIDE PANEL
    cy.get('[class="action showcart"]').click({ force: true });
    cy.wait(2000);
    cy.get('[class="action viewcart"]').click();
    cy.wait(5000);
    cy.url().should("contain", "/checkout/cart/");
    //PROCEED TO CHECKOUT FROM CART
    cy.get('[class="action primary checkout"]').eq(1).click();
    cy.wait(5000);
    cy.url().should("contain", "/checkout/#shipping");
    //FILLING CUSTOMER INFORMATIONS
    cy.get("#customer-email").type(randomUserMail);
    cy.get('input[name="firstname"]').type(randomFirstName);
    cy.get('input[name="lastname"]').type(randomLastName);
    cy.get('input[name="company"]').type("Microsoft");
    cy.get('input[name="street[0]"]').type(randomAdress);
    cy.get('input[name="city"]').type(randomCity);
    //cy.get(".select").eq(0).select("Paris").should("have.value", "Paris");
    cy.get('select[name="region_id"]')
      .select("Paris")
      .should("have.value", "Paris");
    cy.get('input[name="postcode"]').type("12345");
    cy.get('select[name="country_id"]')
      .select("France")
      .should("have.value", "France");
    cy.get('input[name="telephone"]').type(randomPhoneNumber);
    //SELECT SHIPPING METHOD
    cy.get('[class="radio"]').first().click();
    //REVIEW & PAYMENT
    cy.get('[class="button action continue primary"]').click();
    cy.url().should("contain", "/checkout/#payment");
    //CHANGE BILLING ADRESS
    cy.get("#billing-address-same-as-shipping-checkmo")
      .uncheck()
      .should("not.be.checked");
    cy.get("#customer-email").type(randomUserMailBill);
    cy.get("#GD10BST").type(randomFirstNameBill);
    cy.get("#GD10BST").type(randomFirstNameBill);
    cy.get("#KGV1BLE").type(randomLastNameBill);
    cy.get("#JC1E9XH").type("Microsoft");
    cy.get("#CHK0V9G").type(randomAdressBill);
    cy.get("#YJN9VT8").type(randomAdressBill);
    cy.get("#V5NKL2E").select("FR").should("have.value", "France");
    cy.get("#W6I7NHF").type("12345");
    cy.get('[data-title="France"]').click();
    cy.get("#U5IJIFR").type(randomPhoneNumberBill);
    cy.get('[class="action action-update"]');
  });

  it("Vérification et paiement", () => {
    cy.get('[class="billing-address-details"]')
      .should("have.value", randomUserMail)
      .and("have.value", randomFirstName)
      .and("have.value", randomLastName)
      .and("have.text", "Microsoft")
      .and("have.value", randomAdress)
      .and("have.text", "France")
      .and("have value", randomPhoneNumber);
    cy.get('[class="action primary checkout"]').click();
    cy.url().should(
      "contains",
      "https://magento.softwaretestingboard.com/checkout/onepage/success/"
    );
  });
});
