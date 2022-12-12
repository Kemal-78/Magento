/// <reference types="cypress" />

import { faker } from "@faker-js/faker/locale/fr";

let randomUserMail = faker.internet.email();
let randomFirstName = faker.name.firstName();
let randomLastName = faker.name.lastName();
let randomAdress = faker.address.streetAddress();
let randomCity = faker.address.city();
let randomPhoneNumber = faker.phone.number("06########");

describe("Soutenance", () => {
  before(() => {
    cy.visit("https://magento.softwaretestingboard.com/");
  });

  it("Ajout d'un article au panier", () => {
    cy.url().should("contain", "https://magento.softwaretestingboard.com");
    cy.get("#ui-id-4").click();
    cy.get("dd > .items > :nth-child(1) > a").click();
    cy.get("#option-label-size-143-item-169").click();
    cy.get("#option-label-color-93-item-60").click();
    cy.get('[class="actions-primary"]').find(':input[name="form_key"]').click();
  });

  it("modifier le panier", () => {
    cy.url().should(
      "contain",
      "https://magento.softwaretestingboard.com/women/tops-women.html"
    );
    cy.get('[class="action showcart active"]').click();
    cy.get('[class="action edit"]').click();
    cy.url().should(
      "contain",
      "https://magento.softwaretestingboard.com/checkout/cart/configure/id/117968/product_id/1812/"
    );
    cy.get("#qty").type("5").and("have.value", "5");
    cy.get("#option-label-size-143-item-169").click();
    cy.get("#option-label-color-93-item-60").click();
    cy.get("#product-updatecart-button").click();
  });

  it("Adresse d'envoi", () => {
    cy.url().should(
      "contain",
      "https://magento.softwaretestingboard.com/checkout/cart/"
    );
    cy.get('[class="action primary checkout"]').click();
    cy.url().should(
      "contain",
      "https://magento.softwaretestingboard.com/checkout/#shipping"
    );
    cy.get("#customer-email").type(randomUserMail);
    cy.get("#GD10BST").type(randomFirstName);
    cy.get("#GD10BST").type(randomFirstName);
    cy.get("#KGV1BLE").type(randomLastName);
    cy.get("#JC1E9XH").type("Microsoft");
    cy.get("#CHK0V9G").type(randomAdress);
    cy.get("#YJN9VT8").type(randomCity);
    cy.get("#LK55JAQ").select("FR").should("have.value", "France");
    cy.get("#W6I7NHF").type("12345");
    cy.get('[data-title="France"]').click();
    cy.get("#U5IJIFR").type(randomPhoneNumber);
    cy.get('[class="radio"]').click();
    cy.get('[class="button action continue primary"]').click();
  });

  it("saisir une adresse de facturation différente", () => {
    cy.get().should(
      "contains",
      "https://magento.softwaretestingboard.com/checkout/#payment"
    );
    cy.get("#billing-address-same-as-shipping-checkmo")
      .uncheck()
      .should("not.be.checked");
    cy.get("#customer-email").type(randomUserMail);
    cy.get("#GD10BST").type(randomFirstName);
    cy.get("#GD10BST").type(randomFirstName);
    cy.get("#KGV1BLE").type(randomLastName);
    cy.get("#JC1E9XH").type("Microsoft");
    cy.get("#CHK0V9G").type(randomAdress);
    cy.get("#YJN9VT8").type(randomAdress);
    cy.get("#V5NKL2E").select("FR").should("have.value", "France");
    cy.get("#W6I7NHF").type("12345");
    cy.get('[data-title="France"]').click();
    cy.get("#U5IJIFR").type(randomPhoneNumber);
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
