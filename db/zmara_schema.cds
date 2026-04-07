namespace ZMM_SBC_2903;

entity ZMARA {
   key MATNR : String(20);
       MTART : String(1);
       MBRSH : String(2);
       LAEDA : Date;
       MATKL : String(2);
       PSTAT : String(1);

   toZMARC  : Association to many ZMARC on toZMARC.MATNR = $self.MATNR;
   toZMARD  : Association to many ZMARD on toZMARD.MATNR = $self.MATNR;
   toZMAKTX : Association to many ZMAKTX on toZMAKTX.MATNR = $self.MATNR;
   toZMATSTORAGE : Association to many Z_MAT_STORAGE on toZMATSTORAGE.MATNR = $self.MATNR;
}

entity ZMARC {
   key MATNR : String(20);
   key WERKS : String(4);
       MMSTA : String(1);

   toZMARA : Association to ZMARA on toZMARA.MATNR = MATNR;
}

entity ZMARD {
    key MATNR : String(20);
    key WERKS : String(4);
    key LGORT : String(10);

    toZMARA : Association to ZMARA on toZMARA.MATNR = MATNR;
}

entity ZMAKTX {
    key MATNR : String(20);
    key SPRAS : String(2);
        MAKTX : String(100);

    toZMARA : Association to ZMARA on toZMARA.MATNR = MATNR;
}

entity Z_MAT_STORAGE {
    key MATNR : String(20);
    key WERKS : String(4);
    key LGORT : String(10);
        MENGE : Decimal(13,3);
        MEINS : String(3);

    toZMARA : Association to ZMARA on toZMARA.MATNR = MATNR;
}