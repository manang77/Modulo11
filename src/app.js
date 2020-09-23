const reservas = [
  {
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 3,
  },
  {
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 4,
  },
  {
    tipoHabitacion: "suite",
    desayuno: true,
    pax: 2,
    noches: 1,
  },
];

class HotelReservation {
  constructor() {
    this._IVAType = 1.21;
    this._additionalPersonRate = 40;
    this._reservationList = [];
    this._reservationSubtotal = 0;
    this._reservationTotal = 0;
  }

  set reservation(reservationList) {
    this._reservationList = reservationList;
    this.calculateSubTotal();
    this.calculateTotal();
  }

  calculateSubTotal() {
    this._reservationSubtotal = this._reservationList.reduce(
      (acumSubTotal, { pax, tipoHabitacion, noches }) =>
        (acumSubTotal +=
          noches *
          (this.getRoomCost(tipoHabitacion) + (pax - 1) * this._additionalPersonRate)),
      0
    );
  }

  calculateTotal() {
    this._reservationTotal = this._reservationSubtotal * this._IVAType;
  }

  getRoomCost(roomType) {
    switch (roomType) {
      case "standard":
        return 100;

      case "suite":
        return 150;
    }
  }

  get reservationSubTotal() {
    return this._reservationSubtotal;
  }

  get reservationTotal() {
    return this._reservationTotal;
  }
}

class HotelReservationTourOperator extends HotelReservation {
  constructor() {
    super();
    this._roomCost = 100;
    this._reservationDiscount = 0.15;
  }

  calculateSubTotal() {
    this._reservationSubtotal = this._reservationList.reduce(
      (acumSubTotal, { pax, noches }) =>
        (acumSubTotal +=
          noches *
          (1 - this._reservationDiscount) *
          (this._roomCost + (pax - 1) * this._additionalPersonRate)),
      0
    );
  }
}

class HotelReservationBase {
  constructor(roomPrices) {
    this._IVAType = 1.21;
    this._additionalPersonRate = 40;
    this._breakfastRate = 15;
    this._roomTypePrices = roomPrices;
    this._reservationList = [];
    this._reservationSubtotal = 0;
    this._reservationTotal = 0;
  }

  set reservation(reservationList) {
    this._reservationList = reservationList;
    this.calculateSubTotal();
    this.calculateTotal();
  }

  calculateSubTotal() {
    this._reservationSubtotal = this._reservationList.reduce(
      (acumSubTotal, { pax, tipoHabitacion, desayuno, noches }) =>
        (acumSubTotal +=
          noches *
            (this.getRoomCost(tipoHabitacion) + (pax - 1) * this._additionalPersonRate) +
          (desayuno ? pax * this._breakfastRate : 0)),
      0
    );
  }

  calculateTotal() {
    this._reservationTotal = this._reservationSubtotal * this._IVAType;
  }

  getRoomCost(roomType) {
    return this._roomTypePrices.find(room => room.type === roomType).price;
  }

  get reservationSubTotal() {
    return this._reservationSubtotal;
  }

  get reservationTotal() {
    return this._reservationTotal;
  }
}

class HotelReservationParticular extends HotelReservationBase {
  constructor() {
    const roomTypePrices = [
      { type: "standard", price: 100 },
      { type: "suite", price: 150 },
    ];
    super(roomTypePrices);
  }
}

class HotelReservationForTourOperator extends HotelReservationBase {
  constructor() {
    const roomTypePrices = [
      { type: "standard", price: 100 },
      { type: "suite", price: 100 },
    ];
    super(roomTypePrices);
    this._reservationDiscount = 0.15;
  }

  calculateSubTotal() {
    this._reservationSubtotal = this._reservationList.reduce(
      (acumSubTotal, { pax, tipoHabitacion, desayuno, noches }) =>
        (acumSubTotal +=
          noches *
          (1 - this._reservationDiscount) *
          (this.getRoomCost(tipoHabitacion) +
            (pax - 1) * this._additionalPersonRate +
            (desayuno ? pax * this._breakfastRate : 0))),
      0
    );
  }
}

const myReservation = new HotelReservation();
myReservation.reservation = reservas;

const myReservationTourOperator = new HotelReservationTourOperator();
myReservationTourOperator.reservation = reservas;

const myReservationParticular = new HotelReservationParticular();
myReservationParticular.reservation = reservas;

const myReservationForTourOperator = new HotelReservationForTourOperator();
myReservationForTourOperator.reservation = reservas;

console.log("*****************************************************************************");
console.log("*** LAB MODULO 11 ==> CASO 1                                              ***");
console.log("*****************************************************************************");
console.log("*** RESERVA                                                               ***");
console.log("*****************************************************************************");
console.log(reservas);
console.log("*****************************************************************************");
console.log("*** SUBTOTAL -> " + myReservation.reservationSubTotal);
console.log("*****************************************************************************");
console.log("*** TOTAL -> " + myReservation.reservationTotal);
console.log("*****************************************************************************");
console.log("");
console.log("*****************************************************************************");
console.log("*** LAB MODULO 11 ==> CASO 2                                              ***");
console.log("*****************************************************************************");
console.log("*** RESERVA                                                               ***");
console.log("*****************************************************************************");
console.log(reservas);
console.log("*****************************************************************************");
console.log("*** SUBTOTAL -> " + myReservationTourOperator.reservationSubTotal);
console.log("*****************************************************************************");
console.log("*** TOTAL -> " + myReservationTourOperator.reservationTotal);
console.log("*****************************************************************************");
console.log("");
console.log("*****************************************************************************");
console.log("*** LAB MODULO 11 ==> DESAFIO + EJERCICIO ADICIONAL -> RESERVA PARTICULAR ***");
console.log("*****************************************************************************");
console.log("*** RESERVA                                                               ***");
console.log("*****************************************************************************");
console.log(reservas);
console.log("*****************************************************************************");
console.log("*** SUBTOTAL -> " + myReservationParticular.reservationSubTotal);
console.log("*****************************************************************************");
console.log("*** TOTAL -> " + myReservationParticular.reservationTotal);
console.log("*****************************************************************************");
console.log("*****************************************************************************");
console.log("*** LAB MODULO 11 ==> DESAFIO + EJERCICIO ADICIONAL RESERVA TOUR OPERADOR ***");
console.log("*****************************************************************************");
console.log("*** RESERVA                                                               ***");
console.log("*****************************************************************************");
console.log(reservas);
console.log("*****************************************************************************");
console.log("*** SUBTOTAL -> " + myReservationForTourOperator.reservationSubTotal);
console.log("*****************************************************************************");
console.log("*** TOTAL -> " + myReservationForTourOperator.reservationTotal);
console.log("*****************************************************************************");

//*********************************************************************************************
//******** E J E R C I C I O     A D I C I O N A L
//*********************************************************************************************

class Cuenta {
  constructor(
    accountId,
    beneficiaryNIF,
    beneficiaryName,
    accountName,
    accountBalance,
    accountType
  ) {
    this._accountId = accountId;
    this._beneficiaryNIF = beneficiaryNIF;
    this._beneficiaryName = beneficiaryName;
    this._accountName = accountName;
    this._accountBalance = accountBalance;
    this._accountType = accountType;
    this._transferRate = [
      { type: "particular", cost: 1 },
      { type: "empresa", cost: 0.5 },
    ];
  }

  get accountId() {
    return this._accountId;
  }

  showStatus() {
    console.log("***************************************************");
    console.log("Cuenta.............: " + this._accountId);
    console.log("Nombre Beneficiario: " + this._beneficiaryName);
    console.log("Nombre Cuenta......: " + this._accountName);
    console.log("Tipo Cuenta........: " + this._accountType);
    console.log("Saldo..............: " + this._accountBalance);
    console.log("***************************************************");
  }

  calculateTransactionRate() {
    return this._transferRate.find(accountType => accountType.type === this._accountType)
      .cost;
  }

  accountOutcome(amount) {
    this._accountBalance = this._accountBalance - amount - this.calculateTransactionRate();
  }

  accountIncome(amount) {
    this._accountBalance += amount;
  }
}

class Transaction {
  constructor(originAccount, destinationAccount, transactionAmount) {
    this._originAccount = originAccount;
    this._destinationAccount = destinationAccount;
    this._transactionAmount = transactionAmount;
  }

  get originAccount() {
    return this._originAccount;
  }

  get destinationAccount() {
    return this._destinationAccount;
  }

  get transactionAmount() {
    return this._transactionAmount;
  }
}

class accountingBook {
  constructor() {
    this._transactionList = [];
  }

  performTransaction(transaction) {
    transaction.originAccount.accountOutcome(transaction.transactionAmount);
    transaction.destinationAccount.accountIncome(transaction.transactionAmount);
    this._transactionList.push(transaction);
  }

  listaTransacciones() {
    this._transactionList.forEach(transaction => {
      console.log("************** LISTADO DE TRANSACCIONES *********************");
      console.log("Cuenta Origen.: " + transaction.originAccount.accountId);
      console.log("Cuenta Destino: " + transaction.destinationAccount.accountId);
      console.log("Importe.......: " + transaction.transactionAmount);
      console.log("=============================================================");
    });
  }
}

console.log("");
console.log("");
console.log("");
console.log("");
console.log("*****************************************************************************");
console.log("*** LAB MODULO 11 ==> EJERCICIO ADICIONAL                                 ***");
console.log("*****************************************************************************");

const cuentaA = new Cuenta(
  "ES6621000418401234567891 ",
  "12345678X",
  "Juan Perez",
  "Nomina",
  1400,
  "particular"
);

const cuentaB = new Cuenta(
  "ES1000492352082414205416",
  "A84939209",
  "Gestiones SL",
  "gastos",
  84400,
  "empresa"
);

console.log("***** ESTADO INICIAL CUENTAS ");
cuentaA.showStatus();
cuentaB.showStatus();

const myTransaction = new Transaction(cuentaB, cuentaA, 1800);
const myAccountingBook = new accountingBook();
myAccountingBook.performTransaction(myTransaction);

console.log("***** ESTADO DESPUES PRIMERA TRANSACCION ");
cuentaA.showStatus();
cuentaB.showStatus();

const myTransaction2 = new Transaction(cuentaB, cuentaA, 5000);
myAccountingBook.performTransaction(myTransaction2);

console.log("***** ESTADO FINAL CUENTAS ");
cuentaA.showStatus();
cuentaB.showStatus();

console.log("***** LISTADO TRANSACCIONES ");
myAccountingBook.listaTransacciones();
