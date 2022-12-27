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

let qty = faker.random.numeric();

describe("Soutenance", () => {
  beforeEach(() => {
    cy.visit("https://magento.softwaretestingboard.com/");
    cy.url().should("contain", "https://magento.softwaretestingboard.com");
  });

  it("Ajout d'un article au panier", () => {
    cy.addtocart();
  });
  it("Modifier le nombre d'articles au panier", () => {
    cy.addtocart();
    cy.get('[class="action showcart"]').click({ force: true });
    cy.get('[id="ui-id-1"]').should("be.visible");
    cy.get('[class="action edit"]').click({ force: true });
    cy.url().should("contain", "/product_id/1812/");
    cy.wait(2000);
    cy.get('[class="control"]').find("input").eq(1).clear();
    cy.wait(500);
    cy.get('[class="control"]').find("input").eq(1).type(qty);
    cy.get("#option-label-size-143-item-168").click({ force: true });
    cy.get("#option-label-color-93-item-57").click({ force: true });
    cy.get("#product-updatecart-button").click();
    cy.url().should("contain", "/checkout/cart/");
    cy.get('[class="message-success success message"]').should("be.visible");
    cy.get('[class="counter-number"]')
      .should("be.visible")
      .and("contain.text", qty);
  });

  it("Checkout - Adresses d'envoi et facturation identiques", () => {
    //ADD TO CART
    cy.addtocart();
    //PROCEED TO CART FROM SIDE PANEL
    cy.get('[class="action showcart"]').click({ force: true });
    cy.wait(2000);
    cy.get('[class="action viewcart"]').click();
    cy.wait(3000);
    cy.url().should("contain", "/checkout/cart/");
    //PROCEED TO CHECKOUT FROM CART
    cy.get('[class="action primary checkout"]').eq(1).click();
    cy.wait(3000);
    cy.url().should("contain", "/checkout/#shipping");
    //FILLING CUSTOMER INFORMATIONS
    cy.get("#customer-email").type(randomUserMail);
    cy.get('input[name="firstname"]').type(randomFirstName);
    cy.get('input[name="lastname"]').type(randomLastName);
    cy.get('input[name="company"]').type("Microsoft");
    cy.get('input[name="street[0]"]').type(randomAdress);
    cy.get('input[name="city"]').type(randomCity);
    cy.get('select[name="region_id"]')
      .select("Alabama")
      .should("have.value", "1");
    cy.get('input[name="postcode"]').type("12345");
    cy.get('select[name="country_id"]')
      .select("France")
      .should("have.value", "FR");
    cy.get('input[name="telephone"]').type(randomPhoneNumber);
    //SELECT SHIPPING METHOD
    cy.get('[class="radio"]').first().click();
    //REVIEW & PAYMENT
    cy.get('[class="button action continue primary"]').click();
    cy.url().should("contain", "/checkout/#payment");
    cy.get('[class="billing-address-details"]')
      .should("be.visible")
      .and("contain", randomFirstName)
      .and("contain", randomLastName)
      .and("contain", randomAdress)
      .and("contain", "France")
      .and("contain", randomPhoneNumber);
    //VALIDATION
    cy.get('[class="action primary checkout"]').click();
    cy.url().should("contains", "/checkout/onepage/success/");
    cy.get('[class="checkout-success"]').should("be.visible");
  });

  it("Checkout - Adresses d'envoi et facturation différentes", () => {
    //ADD TO CART
    cy.addtocart();
    //PROCEED TO CART FROM SIDE PANEL
    cy.intercept({
      method: "GET",
      url: "**/Magento_Checkout/template/minicart/subtotal.html",
    }).as("viewcart");
    cy.get('[class="action showcart"]').click({ force: true });
    cy.get('[class="action viewcart"]').click({ force: true });
    cy.wait("@viewcart");
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
    cy.get('select[name="country_id"]')
      .select("France")
      .should("have.value", "FR");
    cy.get('select[name="region_id"]')
      .select("Paris")
      .should("have.value", "257");
    cy.get('input[name="postcode"]').type("12345");
    cy.get('input[name="telephone"]').type(randomPhoneNumber);
    //SELECT SHIPPING METHOD
    cy.get('[class="radio"]').first().click();
    //REVIEW & PAYMENT
    cy.get('[class="button action continue primary"]').click();
    cy.url().should("contain", "/checkout/#payment");
    //CHANGE BILLING ADRESS
    cy.get('[id="billing-address-same-as-shipping-checkmo"]')
      .check()
      .should("be.checked");
    cy.wait(1000);
    cy.get('[id="billing-address-same-as-shipping-checkmo"]')
      .uncheck()
      .should("not.be.checked");
    cy.get('input[name="firstname"]').eq(1).type(randomFirstNameBill);
    cy.get('input[name="lastname"]').eq(1).type(randomLastNameBill);
    cy.get('input[name="company"]').eq(1).type("Microsoft");
    cy.get('input[name="street[0]"]').eq(1).type(randomAdressBill);
    cy.get('input[name="city"]').eq(1).type(randomCityBill);
    cy.get('select[name="country_id"]')
      .eq(1)
      .select("Algeria")
      .should("have.value", "DZ");
    cy.get('input[name="postcode"]').eq(1).type("54321");
    cy.get('input[name="telephone"]').eq(1).type(randomPhoneNumberBill);
    cy.get('[class="action action-update"]').click();
    cy.wait(1500);
    //REVIEW & PAYMENT
    cy.url().should("contain", "/checkout/#payment");
    cy.get('[class="billing-address-details"]')
      .should("contain", randomFirstNameBill)
      .and("contain", randomLastNameBill)
      .and("contain", randomAdressBill)
      .and("contain", randomCityBill)
      .and("contain", randomPhoneNumberBill);
    cy.get('[class="shipping-information-content"]')
      .should("contain", randomFirstName)
      .and("contain", randomLastName)
      .and("contain", randomAdress)
      .and("contain", randomCity)
      .and("contain", randomPhoneNumber);
    //VALIDATION
    cy.get('[class="action primary checkout"]').click();
    cy.url().should("contains", "/checkout/onepage/success/");
    cy.get('[class="checkout-success"]').should("be.visible");
  });
});
