using {ZMM_SBC_2903 as db} from '../db/zmara_schema';

service MaterialMasterService {

    @cds.redirection.target
    entity ZMARA as projection on db.ZMARA;

    entity ZMARC as projection on db.ZMARC;

    @cds.redirection.target
    entity ZMARD as projection on db.ZMARD;

    entity ZMAKTX as projection on db.ZMAKTX;

    entity Z_MAT_STORAGE as projection on db.Z_MAT_STORAGE;

    // ✅ SIMPLE READ (NO COMPLEX KEYS)
    entity ZMARA_READ as select from db.ZMARA as ZMARA

        left join db.ZMAKTX as ZMAKTX
            on ZMARA.MATNR = ZMAKTX.MATNR

    {
        key ZMARA.MATNR,

        ZMARA.MTART,
        ZMARA.MBRSH,
        ZMARA.MATKL,
        ZMARA.PSTAT,
        ZMARA.LAEDA,

        ZMAKTX.MAKTX
    };
}