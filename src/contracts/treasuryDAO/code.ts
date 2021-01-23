export const code = `parameter (or (or (or (or (unit %accept_ownership)
(pair %burn (address %from_)
            (pair (nat %token_id)
                  (nat %amount))))
(or (or %call_FA2 (or (pair %balance_of 
                                    (list %requests (pair 
                                                          (address %owner)
                                                          (nat %token_id)))
                                    (contract %callback (list (pair 
                                                                    (pair %request 
                                                                                   (address %owner)
                                                                                   (nat %token_id))
                                                                    (nat %balance)))))
                  (list %transfer (pair 
                                        (address %from_)
                                        (list %txs (pair 
                                                         (address %to_)
                                                         (pair 
                                                               (nat %token_id)
                                                               (nat %amount)))))))
              (list %update_operators (or 
                                          (pair %add_operator 
                                                              (address %owner)
                                                              (pair 
                                                                    (address %operator)
                                                                    (nat %token_id)))
                                          (pair %remove_operator 
                                                                 (address %owner)
                                                                 (pair 
                                                                       (address %operator)
                                                                       (nat %token_id))))))
(or %callCustom (unit %default)
                (unit %none))))
(or (or (unit %confirm_migration)
(bytes %drop_proposal))
(or (nat %flush)
(pair %getVotePermitCounter (unit %viewParam)
                            (contract %viewCallbackTo nat)))))
(or (or (or (address :newAddress %migrate)
(pair %mint (address %to_)
            (pair (nat %token_id)
                  (nat %amount))))
(or (pair %propose (nat %frozen_token)
               (pair %proposal_metadata 
                                        (nat %agora_post_id)
                                        (list %transfers (or 
                                                             (pair %transfer_type 
                                                                                  (mutez %amount)
                                                                                  (address %recipient))
                                                             (pair %transfer_type 
                                                                                  (address %contract_address)
                                                                                  (list %transfer_list (pair 
                                                                                                             (address %from_)
                                                                                                             (list %txs (pair 
                                                                                                                              (address %to_)
                                                                                                                              (pair 
                                                                                                                                    (nat %token_id)
                                                                                                                                    (nat %amount)))))))))))
(nat %set_quorum_threshold)))
(or (or (nat %set_voting_period)
(pair %transfer_contract_tokens 
                                (address %contract_address)
                                (list %params (pair 
                                                    (address %from_)
                                                    (list %txs (pair 
                                                                     (address %to_)
                                                                     (pair 
                                                                           (nat %token_id)
                                                                           (nat %amount))))))))
(or (address :newOwner %transfer_ownership)
(list %vote (pair :permit_protected (pair 
                                          (bytes %proposal_key)
                                          (pair 
                                                (bool %vote_type)
                                                (nat %vote_amount)))
                                    (option %permit (pair 
                                                          (key %key)
                                                          (signature %signature)))))))));
storage (pair (pair (pair (big_map %ledger (pair address
                       nat)
                 nat)
(pair (big_map %operators (pair (address :owner)
                                (address :operator))
                          unit)
      (address %token_address)))
(pair (address %admin)
(pair (address %pending_owner)
      (or %migration_status (unit %notInMigration)
                            (or (address %migratingTo)
                                (address %migratedTo))))))
(pair (pair (nat %voting_period)
(pair (nat %quorum_threshold)
      (pair %extra (pair (nat %frozen_scale_value)
                         (pair 
                               (nat %frozen_extra_value)
                               (nat %slash_scale_value)))
                   (pair (pair 
                               (nat %slash_division_value)
                               (mutez %min_xtz_amount))
                         (pair (mutez %max_xtz_amount)
                               (nat %max_proposal_size))))))
(pair (pair (big_map %proposals bytes
                          (pair (pair (nat %upvotes)
                                      (pair 
                                            (nat %downvotes)
                                            (timestamp %start_date)))
                                (pair (pair 
                                            (pair %metadata 
                                                            (nat %agora_post_id)
                                                            (list %transfers (or 
                                                                                 (pair %transfer_type 
                                                                                                      (mutez %amount)
                                                                                                      (address %recipient))
                                                                                 (pair %transfer_type 
                                                                                                      (address %contract_address)
                                                                                                      (list %transfer_list (pair 
                                                                                                                                 (address %from_)
                                                                                                                                 (list %txs (pair 
                                                                                                                                                  (address %to_)
                                                                                                                                                  (pair 
                                                                                                                                                        (nat %token_id)
                                                                                                                                                        (nat %amount))))))))))
                                            (address %proposer))
                                      (pair 
                                            (nat %proposer_frozen_token)
                                            (list %voters (pair 
                                                                address
                                                                nat))))))
      (set %proposal_key_list_sort_by_date (pair 
                                                 timestamp
                                                 bytes)))
(pair (nat %permits_counter)
      (big_map %metadata string
                         bytes)))));
code { DIP { PUSH
(lambda (pair (pair (pair (pair (big_map (pair address nat) nat) (pair (big_map (pair address address) unit) address)) (pair address (pair address (or unit (or address address))))) (pair (pair nat (pair nat (pair (pair nat (pair nat nat)) (pair (pair nat mutez) (pair mutez nat))))) (pair (pair (big_map bytes (pair (pair nat (pair nat timestamp)) (pair (pair (pair nat (list (or (pair mutez address) (pair address (list (pair address (list (pair address (pair nat nat))))))))) address) (pair nat (list (pair address nat)))))) (set (pair timestamp bytes))) (pair nat (big_map string bytes))))) (pair address (pair nat nat))) (pair (pair (pair (big_map (pair address nat) nat) (pair (big_map (pair address address) unit) address)) (pair address (pair address (or unit (or address address))))) (pair (pair nat (pair nat (pair (pair nat (pair nat nat)) (pair (pair nat mutez) (pair mutez nat))))) (pair (pair (big_map bytes (pair (pair nat (pair nat timestamp)) (pair (pair (pair nat (list (or (pair mutez address) (pair address (list (pair address (list (pair address (pair nat nat))))))))) address) (pair nat (list (pair address nat)))))) (set (pair timestamp bytes))) (pair nat (big_map string bytes))))))
{ DUP;
CAR;
DIP { CDR;
DUP;
CAR;
DIP { CDR } };
DIG 2;
DUP;
CAR;
DIP { CDR };
DIG 3;
PAIR;
DIG 2;
DUP;
CAR;
CAR;
CAR;
DIG 2;
DIP { DUP };
SWAP;
DIP { DUP };
SWAP;
GET;
IF_NONE { DIG 3;
 SOME;
 SWAP;
 UPDATE;
 DIP { DUP;
       DIP { CDR };
       CAR;
       DUP;
       DIP { CDR };
       CAR;
       DUP;
       DIP { CDR };
       CAR };
 SWAP;
 DROP;
 PAIR;
 PAIR;
 PAIR }
{ DIG 4;
 ADD;
 SOME;
 SWAP;
 UPDATE;
 DIP { DUP;
       DIP { CDR };
       CAR;
       DUP;
       DIP { CDR };
       CAR;
       DUP;
       DIP { CDR };
       CAR };
 SWAP;
 DROP;
 PAIR;
 PAIR;
 PAIR } };
PUSH
(lambda (pair (pair (pair (pair (big_map (pair address nat) nat) (pair (big_map (pair address address) unit) address)) (pair address (pair address (or unit (or address address))))) (pair (pair nat (pair nat (pair (pair nat (pair nat nat)) (pair (pair nat mutez) (pair mutez nat))))) (pair (pair (big_map bytes (pair (pair nat (pair nat timestamp)) (pair (pair (pair nat (list (or (pair mutez address) (pair address (list (pair address (list (pair address (pair nat nat))))))))) address) (pair nat (list (pair address nat)))))) (set (pair timestamp bytes))) (pair nat (big_map string bytes))))) (pair address (pair nat nat))) (pair (pair (pair (big_map (pair address nat) nat) (pair (big_map (pair address address) unit) address)) (pair address (pair address (or unit (or address address))))) (pair (pair nat (pair nat (pair (pair nat (pair nat nat)) (pair (pair nat mutez) (pair mutez nat))))) (pair (pair (big_map bytes (pair (pair nat (pair nat timestamp)) (pair (pair (pair nat (list (or (pair mutez address) (pair address (list (pair address (list (pair address (pair nat nat))))))))) address) (pair nat (list (pair address nat)))))) (set (pair timestamp bytes))) (pair nat (big_map string bytes))))))
{ DUP;
CAR;
DIP { CDR;
DUP;
CAR;
DIP { CDR } };
DIG 2;
DUP;
CAR;
DIP { CDR };
DIG 3;
PAIR;
DIG 2;
DUP;
CAR;
CAR;
CAR;
DIG 2;
DIP { DUP };
SWAP;
DIP { DUP };
SWAP;
GET;
IF_NONE { DROP 2;
 SWAP;
 DUP;
 PUSH nat 0;
 SWAP;
 DIP { DUP };
 SWAP;
 COMPARE;
 LT;
 IF { SWAP;
      PAIR;
      PUSH string "FA2_INSUFFICIENT_BALANCE";
      PAIR;
      FAILWITH }
    { DROP 2 } }
{ DIG 4;
 DIP { DUP };
 SWAP;
 DIP { DUP };
 SUB;
 ISNAT;
 IF_NONE { PAIR;
           PUSH string "FA2_INSUFFICIENT_BALANCE";
           PAIR;
           FAILWITH }
         { SOME;
           SWAP;
           DROP;
           SWAP;
           DROP;
           SWAP;
           UPDATE;
           DIP { DUP;
                 DIP { CDR };
                 CAR;
                 DUP;
                 DIP { CDR };
                 CAR;
                 DUP;
                 DIP { CDR };
                 CAR };
           SWAP;
           DROP;
           PAIR;
           PAIR;
           PAIR } } } };
DUP;
CAR;
DIP { CDR };
IF_LEFT { IF_LEFT { IF_LEFT { IF_LEFT { DROP;
                     DUP;
                     CAR;
                     CDR;
                     CDR;
                     CDR;
                     IF_LEFT { DROP }
                             { IF_LEFT { DROP }
                                       { PUSH string "MIGRATED";
                                         PAIR;
                                         FAILWITH } };
                     DUP;
                     CAR;
                     CDR;
                     CDR;
                     CAR;
                     SENDER;
                     COMPARE;
                     EQ;
                     IF {  }
                        { UNIT;
                          PUSH string "NOT_PENDING_ADMIN";
                          PAIR;
                          FAILWITH };
                     DUP;
                     CAR;
                     CDR;
                     CDR;
                     CAR;
                     DIP { DUP;
                           DIP { CDR };
                           CAR;
                           DUP;
                           DIP { CAR };
                           CDR;
                           DUP;
                           DIP { CDR };
                           CAR };
                     SWAP;
                     DROP;
                     PAIR;
                     SWAP;
                     PAIR;
                     PAIR;
                     NIL operation;
                     PAIR }
                   { DIP { DUP;
                           CAR;
                           CDR;
                           CDR;
                           CDR;
                           IF_LEFT { DROP }
                                   { IF_LEFT { DROP }
                                             { PUSH string "MIGRATED";
                                               PAIR;
                                               FAILWITH } };
                           DUP;
                           CAR;
                           CDR;
                           CAR;
                           SENDER;
                           COMPARE;
                           EQ;
                           IF {  }
                              { UNIT;
                                PUSH string "NOT_ADMIN";
                                PAIR;
                                FAILWITH } };
                     SWAP;
                     DIP { DUP;
                           CDR;
                           CAR;
                           DIP { DUP;
                                 CDR;
                                 CDR };
                           PAIR;
                           SWAP;
                           CAR };
                     DIP 3
                         { DUP };
                     DIG 3;
                     DIP { DIP { PAIR };
                           PAIR };
                     SWAP;
                     EXEC;
                     NIL operation;
                     PAIR } }
         { IF_LEFT { IF_LEFT { IF_LEFT { DIP { DUP;
                                               CAR;
                                               CDR;
                                               CDR;
                                               CDR;
                                               IF_LEFT { DROP }
                                                       { IF_LEFT { DROP }
                                                                 { PUSH string "MIGRATED";
                                                                   PAIR;
                                                                   FAILWITH } } };
                                         DUP;
                                         CAR;
                                         DIP { CDR;
                                               DIP { DUP };
                                               SWAP };
                                         NIL (pair (pair address nat) nat);
                                         SWAP;
                                         ITER { DUP;
                                                CAR;
                                                SWAP;
                                                DUP;
                                                CDR;
                                                SWAP;
                                                DUG 2;
                                                DUP;
                                                INT;
                                                EQ;
                                                IF {  }
                                                   { DUP;
                                                     PUSH nat 1;
                                                     COMPARE;
                                                     EQ;
                                                     IF {  }
                                                        { UNIT;
                                                          PUSH string "FA2_TOKEN_UNDEFINED";
                                                          PAIR;
                                                          FAILWITH } };
                                                SWAP;
                                                PAIR;
                                                DIG 3;
                                                DUP;
                                                CAR;
                                                CAR;
                                                CAR;
                                                DIG 2;
                                                GET;
                                                SWAP;
                                                DUG 3;
                                                IF_NONE { PUSH nat 0;
                                                          SWAP;
                                                          PAIR;
                                                          CONS }
                                                        { SWAP;
                                                          PAIR;
                                                          CONS } };
                                         SWAP;
                                         DROP;
                                         DIP { AMOUNT };
                                         TRANSFER_TOKENS;
                                         NIL operation;
                                         SWAP;
                                         CONS;
                                         PAIR }
                                       { DIP { DUP;
                                               CAR;
                                               CDR;
                                               CDR;
                                               CDR;
                                               IF_LEFT { DROP }
                                                       { IF_LEFT { DROP }
                                                                 { PUSH string "MIGRATED";
                                                                   PAIR;
                                                                   FAILWITH } } };
                                         ITER { SWAP;
                                                DUP;
                                                CAR;
                                                CDR;
                                                CAR;
                                                SENDER;
                                                COMPARE;
                                                EQ;
                                                DIG 2;
                                                DUP;
                                                CDR;
                                                SWAP;
                                                DUP;
                                                CAR;
                                                SWAP;
                                                DROP;
                                                DUG 2;
                                                ITER { SWAP;
                                                       DUP;
                                                       IF {  }
                                                          { DUG 3;
                                                            DUG 3;
                                                            DUP;
                                                            SENDER;
                                                            COMPARE;
                                                            EQ;
                                                            IF {  }
                                                               { DUP;
                                                                 DIG 2;
                                                                 DUP;
                                                                 CAR;
                                                                 CAR;
                                                                 CDR;
                                                                 CAR;
                                                                 SWAP;
                                                                 DUG 3;
                                                                 SWAP;
                                                                 SENDER;
                                                                 SWAP;
                                                                 PAIR;
                                                                 MEM;
                                                                 IF {  }
                                                                    { UNIT;
                                                                      PUSH string "FA2_NOT_OPERATOR";
                                                                      PAIR;
                                                                      FAILWITH } };
                                                            DIG 3;
                                                            DIG 3 };
                                                       DUG 3;
                                                       DUP;
                                                       CAR;
                                                       SWAP;
                                                       DUP;
                                                       CDR;
                                                       CDR;
                                                       SWAP;
                                                       DUP;
                                                       CDR;
                                                       CAR;
                                                       SWAP;
                                                       DROP;
                                                       DUP;
                                                       INT;
                                                       EQ;
                                                       IF {  }
                                                          { DUP;
                                                            PUSH nat 1;
                                                            COMPARE;
                                                            EQ;
                                                            IF { DIG 5;
                                                                 DUP;
                                                                 IF { DUG 5 }
                                                                    { UNIT;
                                                                      PUSH string "FROZEN_TOKEN_NOT_TRANSFERABLE";
                                                                      PAIR;
                                                                      FAILWITH } }
                                                               { UNIT;
                                                                 PUSH string "FA2_TOKEN_UNDEFINED";
                                                                 PAIR;
                                                                 FAILWITH } };
                                                       PAIR;
                                                       DUP;
                                                       DIG 3;
                                                       DUP;
                                                       DUG 5;
                                                       DIG 3;
                                                       DUG 2;
                                                       DIG 4;
                                                       DIP 7
                                                           { DUP };
                                                       DIG 7;
                                                       DIP { DIP { PAIR };
                                                             PAIR };
                                                       SWAP;
                                                       EXEC;
                                                       DIP 6
                                                           { DUP };
                                                       DIG 6;
                                                       DIP { DIP { PAIR };
                                                             PAIR };
                                                       SWAP;
                                                       EXEC;
                                                       DUG 2;
                                                       SWAP };
                                                DROP 2 };
                                         NIL operation;
                                         PAIR } }
                             { DIP { DUP;
                                     CAR;
                                     CDR;
                                     CDR;
                                     CDR;
                                     IF_LEFT { DROP }
                                             { IF_LEFT { DROP }
                                                       { PUSH string "MIGRATED";
                                                         PAIR;
                                                         FAILWITH } } };
                               ITER { IF_LEFT { DUP;
                                                CDR;
                                                CDR;
                                                DIP { DUP;
                                                      CDR;
                                                      CAR;
                                                      DIP { CAR } };
                                                DUP;
                                                INT;
                                                EQ;
                                                IF { DROP }
                                                   { DUP;
                                                     PUSH nat 1;
                                                     COMPARE;
                                                     EQ;
                                                     IF { PUSH string "OPERATION_PROHIBITED";
                                                          FAILWITH }
                                                        { UNIT;
                                                          PUSH string "FA2_TOKEN_UNDEFINED";
                                                          PAIR;
                                                          FAILWITH } };
                                                SWAP;
                                                DUP;
                                                SENDER;
                                                COMPARE;
                                                EQ;
                                                IF {  }
                                                   { UNIT;
                                                     PUSH string "NOT_OWNER";
                                                     PAIR;
                                                     FAILWITH };
                                                PAIR;
                                                SWAP;
                                                DUP;
                                                CAR;
                                                CAR;
                                                CDR;
                                                CAR;
                                                DIG 2;
                                                DIP { DUP };
                                                SWAP;
                                                DIP { DUP };
                                                SWAP;
                                                MEM;
                                                IF { DROP 2 }
                                                   { UNIT;
                                                     SOME;
                                                     SWAP;
                                                     UPDATE;
                                                     DIP { DUP;
                                                           DIP { CDR };
                                                           CAR;
                                                           DUP;
                                                           DIP { CDR };
                                                           CAR;
                                                           DUP;
                                                           DIP { CAR };
                                                           CDR;
                                                           DUP;
                                                           DIP { CDR };
                                                           CAR };
                                                     SWAP;
                                                     DROP;
                                                     PAIR;
                                                     SWAP;
                                                     PAIR;
                                                     PAIR;
                                                     PAIR } }
                                              { DUP;
                                                CDR;
                                                CDR;
                                                DIP { DUP;
                                                      CDR;
                                                      CAR;
                                                      DIP { CAR } };
                                                DUP;
                                                INT;
                                                EQ;
                                                IF { DROP }
                                                   { DUP;
                                                     PUSH nat 1;
                                                     COMPARE;
                                                     EQ;
                                                     IF { PUSH string "OPERATION_PROHIBITED";
                                                          FAILWITH }
                                                        { UNIT;
                                                          PUSH string "FA2_TOKEN_UNDEFINED";
                                                          PAIR;
                                                          FAILWITH } };
                                                SWAP;
                                                DUP;
                                                SENDER;
                                                COMPARE;
                                                EQ;
                                                IF {  }
                                                   { UNIT;
                                                     PUSH string "NOT_OWNER";
                                                     PAIR;
                                                     FAILWITH };
                                                PAIR;
                                                SWAP;
                                                DUP;
                                                CAR;
                                                CAR;
                                                CDR;
                                                CAR;
                                                DIG 2;
                                                DIP { DUP };
                                                SWAP;
                                                DIP { DUP };
                                                SWAP;
                                                MEM;
                                                IF { PUSH (option unit) None;
                                                     SWAP;
                                                     UPDATE;
                                                     DIP { DUP;
                                                           DIP { CDR };
                                                           CAR;
                                                           DUP;
                                                           DIP { CDR };
                                                           CAR;
                                                           DUP;
                                                           DIP { CAR };
                                                           CDR;
                                                           DUP;
                                                           DIP { CDR };
                                                           CAR };
                                                     SWAP;
                                                     DROP;
                                                     PAIR;
                                                     SWAP;
                                                     PAIR;
                                                     PAIR;
                                                     PAIR }
                                                   { DROP 2 } } };
                               NIL operation;
                               PAIR } }
                   { IF_LEFT { DROP;
                               DUP;
                               CAR;
                               CDR;
                               CDR;
                               CDR;
                               IF_LEFT { DROP }
                                       { IF_LEFT { DROP }
                                                 { PUSH string "MIGRATED";
                                                   PAIR;
                                                   FAILWITH } };
                               NIL operation }
                             { DROP;
                               NIL operation };
                     PAIR } } }
{ IF_LEFT { IF_LEFT { DROP;
                     DUP;
                     CAR;
                     CDR;
                     CDR;
                     CDR;
                     IF_LEFT { DROP;
                               UNIT;
                               PUSH string "NOT_MIGRATING";
                               PAIR;
                               FAILWITH }
                             { IF_LEFT { DUP;
                                         SENDER;
                                         COMPARE;
                                         EQ;
                                         IF {  }
                                            { UNIT;
                                              PUSH string "NOT_MIGRATION_TARGET";
                                              PAIR;
                                              FAILWITH };
                                         RIGHT address;
                                         RIGHT unit;
                                         DIP { DUP;
                                               DIP { CDR };
                                               CAR;
                                               DUP;
                                               DIP { CAR };
                                               CDR;
                                               DUP;
                                               DIP { CAR };
                                               CDR;
                                               DUP;
                                               DIP { CAR };
                                               CDR };
                                         SWAP;
                                         DROP;
                                         SWAP;
                                         PAIR;
                                         SWAP;
                                         PAIR;
                                         SWAP;
                                         PAIR;
                                         PAIR }
                                       { PUSH string "MIGRATED";
                                         PAIR;
                                         FAILWITH } };
                     NIL operation;
                     PAIR }
                   { DIP { DUP;
                           CAR;
                           CDR;
                           CDR;
                           CDR;
                           IF_LEFT { DROP }
                                   { IF_LEFT { DROP }
                                             { PUSH string "MIGRATED";
                                               PAIR;
                                               FAILWITH } };
                           DUP;
                           CAR;
                           CDR;
                           CAR;
                           SENDER;
                           COMPARE;
                           EQ;
                           IF {  }
                              { UNIT;
                                PUSH string "NOT_ADMIN";
                                PAIR;
                                FAILWITH };
                           DUP };
                     SWAP;
                     DIP { DUP };
                     SWAP;
                     DIP { CDR;
                           CDR;
                           CAR;
                           CAR };
                     GET;
                     IF_NONE { UNIT;
                               PUSH string "PROPOSAL_NOT_EXIST";
                               PAIR;
                               FAILWITH }
                             {  };
                     DIP { SWAP;
                           DUP };
                     SWAP;
                     DIP { DUP };
                     SWAP;
                     CAR;
                     CDR;
                     CDR;
                     SWAP;
                     CDR;
                     CAR;
                     CAR;
                     INT;
                     ADD;
                     NOW;
                     COMPARE;
                     GE;
                     IF { PUSH bool True }
                        { PUSH bool False };
                     IF { DIP { DUP };
                          SWAP;
                          DIP { DUP };
                          SWAP;
                          DUP;
                          CAR;
                          CAR;
                          DIP { CAR;
                                CDR;
                                CAR };
                          ADD;
                          SWAP;
                          CDR;
                          CAR;
                          CDR;
                          CAR;
                          COMPARE;
                          LE;
                          IF { PUSH bool True }
                             { PUSH bool False };
                          DIP { DUP;
                                CAR;
                                CAR;
                                DIP { DUP;
                                      CAR;
                                      CDR;
                                      CAR };
                                COMPARE;
                                GT;
                                IF { PUSH bool True }
                                   { PUSH bool False } };
                          AND;
                          IF { NIL operation;
                               DUG 3;
                               DUP;
                               CDR;
                               CDR;
                               CAR;
                               DIP { DUP;
                                     CDR;
                                     CAR;
                                     CDR;
                                     DIP { SWAP } };
                               SWAP;
                               DIP { SWAP;
                                     DUP };
                               SWAP;
                               DIP { DUP };
                               SWAP;
                               PUSH nat 1;
                               SWAP;
                               PAIR;
                               DIP { CAR;
                                     CAR;
                                     CAR };
                               GET;
                               IF_NONE { UNIT;
                                         PUSH string "PROPOSER_NOT_EXIST_IN_LEDGER";
                                         PAIR;
                                         FAILWITH }
                                       {  };
                               DIG 3;
                               DIP { DUP };
                               SWAP;
                               DIP { DUP };
                               SWAP;
                               COMPARE;
                               GT;
                               IF { DROP }
                                  { SWAP;
                                    DROP };
                               DIG 2;
                               DIP 2
                                   { DUP };
                               DIG 2;
                               DIP 2
                                   { DUP };
                               DIG 2;
                               PUSH nat 1;
                               PAIR;
                               DIP { SWAP };
                               SWAP;
                               DIP { SWAP };
                               DIP 8
                                   { DUP };
                               DIG 8;
                               DIP { DIP { PAIR };
                                     PAIR };
                               SWAP;
                               EXEC;
                               DIP { PUSH nat 0;
                                     PAIR;
                                     SWAP };
                               DIP 7
                                   { DUP };
                               DIG 7;
                               DIP { DIP { PAIR };
                                     PAIR };
                               SWAP;
                               EXEC;
                               SWAP;
                               DUP;
                               DIG 2;
                               SWAP;
                               CDR;
                               CDR;
                               CDR;
                               ITER { DUP;
                                      CAR;
                                      DIP { CDR };
                                      SWAP;
                                      DIG 2;
                                      DIP 2
                                          { DUP };
                                      DIG 2;
                                      DIP 2
                                          { DUP };
                                      DIG 2;
                                      PUSH nat 1;
                                      PAIR;
                                      DIP { SWAP };
                                      SWAP;
                                      DIP { SWAP };
                                      DIP 8
                                          { DUP };
                                      DIG 8;
                                      DIP { DIP { PAIR };
                                            PAIR };
                                      SWAP;
                                      EXEC;
                                      DIP { PUSH nat 0;
                                            PAIR;
                                            SWAP };
                                      DIP 7
                                          { DUP };
                                      DIG 7;
                                      DIP { DIP { PAIR };
                                            PAIR };
                                      SWAP;
                                      EXEC };
                               SWAP;
                               DIP { SWAP };
                               CAR;
                               CDR;
                               CDR;
                               PAIR;
                               DIP { DUP;
                                     CDR;
                                     CDR;
                                     CAR;
                                     CDR;
                                     PUSH bool False };
                               UPDATE;
                               DIP { DUP;
                                     DIP { CAR };
                                     CDR;
                                     DUP;
                                     DIP { CAR };
                                     CDR;
                                     DUP;
                                     DIP { CDR };
                                     CAR;
                                     DUP;
                                     DIP { CAR };
                                     CDR };
                               SWAP;
                               DROP;
                               SWAP;
                               PAIR;
                               PAIR;
                               SWAP;
                               PAIR;
                               SWAP;
                               PAIR;
                               SWAP;
                               PAIR }
                             { UNIT;
                               PUSH string "FAIL_DROP_PROPOSAL_NOT_ACCEPTED";
                               PAIR;
                               FAILWITH } }
                        { UNIT;
                          PUSH string "FAIL_DROP_PROPOSAL_NOT_OVER";
                          PAIR;
                          FAILWITH } } }
         { IF_LEFT { DIP { DUP;
                           CAR;
                           CDR;
                           CDR;
                           CDR;
                           IF_LEFT { DROP }
                                   { IF_LEFT { DROP }
                                             { PUSH string "MIGRATED";
                                               PAIR;
                                               FAILWITH } } };
                     DUP;
                     INT;
                     EQ;
                     IF { UNIT;
                          PUSH string "BAD_ENTRYPOINT_PARAMETER";
                          PAIR;
                          FAILWITH }
                        {  };
                     PUSH nat 0;
                     PAIR;
                     NIL operation;
                     DIG 2;
                     DUP;
                     CDR;
                     CDR;
                     CAR;
                     CDR;
                     ITER { CDR;
                            DIP { DUP };
                            SWAP;
                            DIP { DUP };
                            SWAP;
                            DIP { CDR;
                                  CDR;
                                  CAR;
                                  CAR };
                            GET;
                            IF_NONE { UNIT;
                                      PUSH string "PROPOSAL_NOT_EXIST";
                                      PAIR;
                                      FAILWITH }
                                    {  };
                            DIP { SWAP;
                                  DUP };
                            SWAP;
                            DIP { DUP };
                            SWAP;
                            CAR;
                            CDR;
                            CDR;
                            SWAP;
                            CDR;
                            CAR;
                            CAR;
                            INT;
                            ADD;
                            NOW;
                            COMPARE;
                            GE;
                            IF { PUSH bool True }
                               { PUSH bool False };
                            IF { DIG 4;
                                 DUP;
                                 CAR;
                                 DIP { CDR };
                                 SWAP;
                                 DUP;
                                 DIP 2
                                     { DUP };
                                 DIG 2;
                                 COMPARE;
                                 GE;
                                 IF { SWAP;
                                      PAIR;
                                      PUSH bool True }
                                    { SWAP;
                                      PUSH nat 1;
                                      ADD;
                                      PAIR;
                                      PUSH bool False };
                                 NOT;
                                 IF { DUG 4;
                                      DIP { DUP };
                                      SWAP;
                                      DIP { DUP };
                                      SWAP;
                                      DUP;
                                      CAR;
                                      CAR;
                                      DIP { CAR;
                                            CDR;
                                            CAR };
                                      ADD;
                                      SWAP;
                                      CDR;
                                      CAR;
                                      CDR;
                                      CAR;
                                      COMPARE;
                                      LE;
                                      IF { PUSH bool True }
                                         { PUSH bool False };
                                      DIP { DUP;
                                            CAR;
                                            CAR;
                                            DIP { DUP;
                                                  CAR;
                                                  CDR;
                                                  CAR };
                                            COMPARE;
                                            GT;
                                            IF { PUSH bool True }
                                               { PUSH bool False } };
                                      AND;
                                      IF { DUP;
                                           CDR;
                                           CDR;
                                           CAR;
                                           DIP { DUP;
                                                 CDR;
                                                 CAR;
                                                 CDR;
                                                 DIP { SWAP } };
                                           SWAP;
                                           DIP { SWAP;
                                                 DUP };
                                           SWAP;
                                           DIP { DUP };
                                           SWAP;
                                           PUSH nat 1;
                                           SWAP;
                                           PAIR;
                                           DIP { CAR;
                                                 CAR;
                                                 CAR };
                                           GET;
                                           IF_NONE { UNIT;
                                                     PUSH string "PROPOSER_NOT_EXIST_IN_LEDGER";
                                                     PAIR;
                                                     FAILWITH }
                                                   {  };
                                           DIG 3;
                                           DIP { DUP };
                                           SWAP;
                                           DIP { DUP };
                                           SWAP;
                                           COMPARE;
                                           GT;
                                           IF { DROP }
                                              { SWAP;
                                                DROP };
                                           DIG 2;
                                           DIP 2
                                               { DUP };
                                           DIG 2;
                                           DIP 2
                                               { DUP };
                                           DIG 2;
                                           PUSH nat 1;
                                           PAIR;
                                           DIP { SWAP };
                                           SWAP;
                                           DIP { SWAP };
                                           DIP 9
                                               { DUP };
                                           DIG 9;
                                           DIP { DIP { PAIR };
                                                 PAIR };
                                           SWAP;
                                           EXEC;
                                           DIP { PUSH nat 0;
                                                 PAIR;
                                                 SWAP };
                                           DIP 8
                                               { DUP };
                                           DIG 8;
                                           DIP { DIP { PAIR };
                                                 PAIR };
                                           SWAP;
                                           EXEC;
                                           SWAP;
                                           DUP;
                                           DIG 2;
                                           SWAP;
                                           CDR;
                                           CDR;
                                           CDR;
                                           ITER { DUP;
                                                  CAR;
                                                  DIP { CDR };
                                                  SWAP;
                                                  DIG 2;
                                                  DIP 2
                                                      { DUP };
                                                  DIG 2;
                                                  DIP 2
                                                      { DUP };
                                                  DIG 2;
                                                  PUSH nat 1;
                                                  PAIR;
                                                  DIP { SWAP };
                                                  SWAP;
                                                  DIP { SWAP };
                                                  DIP 9
                                                      { DUP };
                                                  DIG 9;
                                                  DIP { DIP { PAIR };
                                                        PAIR };
                                                  SWAP;
                                                  EXEC;
                                                  DIP { PUSH nat 0;
                                                        PAIR;
                                                        SWAP };
                                                  DIP 8
                                                      { DUP };
                                                  DIG 8;
                                                  DIP { DIP { PAIR };
                                                        PAIR };
                                                  SWAP;
                                                  EXEC };
                                           SWAP;
                                           DUP;
                                           DIP { SWAP };
                                           CDR;
                                           CAR;
                                           CAR;
                                           CDR;
                                           NIL operation;
                                           PUSH bool False;
                                           DIG 2;
                                           ITER { IF_LEFT { DUP;
                                                            CDR;
                                                            CONTRACT unit;
                                                            IF_NONE { DROP 2;
                                                                      PUSH bool True }
                                                                    { SWAP;
                                                                      CAR;
                                                                      UNIT;
                                                                      TRANSFER_TOKENS;
                                                                      DIP { SWAP };
                                                                      CONS;
                                                                      SWAP } }
                                                          { DUP;
                                                            CAR;
                                                            CONTRACT %transfer (list (pair address (list (pair address (pair nat nat)))));
                                                            IF_NONE { DROP 2;
                                                                      PUSH bool True }
                                                                    { SWAP;
                                                                      CDR;
                                                                      PUSH mutez 0;
                                                                      SWAP;
                                                                      TRANSFER_TOKENS;
                                                                      DIP { SWAP };
                                                                      CONS;
                                                                      SWAP } } };
                                           IF { UNIT;
                                                PUSH string "FAIL_DECISION_LAMBDA";
                                                PAIR;
                                                FAILWITH }
                                              {  };
                                           DIG 4;
                                           ITER { CONS };
                                           SWAP;
                                           DIG 3;
                                           DIG 3;
                                           CAR;
                                           CDR;
                                           CDR;
                                           PAIR;
                                           DIP { DUP;
                                                 CDR;
                                                 CDR;
                                                 CAR;
                                                 CDR;
                                                 PUSH bool False };
                                           UPDATE;
                                           DIP { DUP;
                                                 DIP { CAR };
                                                 CDR;
                                                 DUP;
                                                 DIP { CAR };
                                                 CDR;
                                                 DUP;
                                                 DIP { CDR };
                                                 CAR;
                                                 DUP;
                                                 DIP { CAR };
                                                 CDR };
                                           SWAP;
                                           DROP;
                                           SWAP;
                                           PAIR;
                                           PAIR;
                                           SWAP;
                                           PAIR;
                                           SWAP;
                                           PAIR }
                                         { DIP { DUP };
                                           SWAP;
                                           DIP { DUP };
                                           SWAP;
                                           CDR;
                                           CDR;
                                           CAR;
                                           SWAP;
                                           CDR;
                                           CAR;
                                           CDR;
                                           CDR;
                                           DUP;
                                           CAR;
                                           CDR;
                                           CDR;
                                           DIP { SWAP };
                                           MUL;
                                           SWAP;
                                           CDR;
                                           CAR;
                                           CAR;
                                           SWAP;
                                           EDIV;
                                           IF_NONE { PUSH nat 0 }
                                                   { CAR };
                                           DIP { DUP;
                                                 CDR;
                                                 CDR;
                                                 CAR;
                                                 DIP { DUP;
                                                       CDR;
                                                       CAR;
                                                       CDR;
                                                       DIP { SWAP } };
                                                 DUP };
                                           SWAP;
                                           DIP { DUP };
                                           SUB;
                                           ISNAT;
                                           IF_NONE { DIG 3;
                                                     DIP 2
                                                         { DUP };
                                                     DIG 2;
                                                     DIP 4
                                                         { DUP };
                                                     DIG 4 }
                                                   { DROP;
                                                     DIG 3;
                                                     DIP { DUP };
                                                     SWAP;
                                                     DIP 4
                                                         { DUP };
                                                     DIG 4 };
                                           DIP { PUSH nat 1;
                                                 PAIR };
                                           DIG 2;
                                           DIP 10
                                               { DUP };
                                           DIG 10;
                                           DIP { DIP { PAIR };
                                                 PAIR };
                                           SWAP;
                                           EXEC;
                                           SWAP;
                                           DIP { SWAP;
                                                 DIP { SWAP } };
                                           SWAP;
                                           SUB;
                                           ISNAT;
                                           IF_NONE { PUSH nat 0 }
                                                   {  };
                                           SWAP;
                                           DIP { SWAP;
                                                 DUP };
                                           SWAP;
                                           DIP { DUP };
                                           SWAP;
                                           PUSH nat 1;
                                           SWAP;
                                           PAIR;
                                           DIP { CAR;
                                                 CAR;
                                                 CAR };
                                           GET;
                                           IF_NONE { UNIT;
                                                     PUSH string "PROPOSER_NOT_EXIST_IN_LEDGER";
                                                     PAIR;
                                                     FAILWITH }
                                                   {  };
                                           DIG 3;
                                           DIP { DUP };
                                           SWAP;
                                           DIP { DUP };
                                           SWAP;
                                           COMPARE;
                                           GT;
                                           IF { DROP }
                                              { SWAP;
                                                DROP };
                                           DIG 2;
                                           DIP 2
                                               { DUP };
                                           DIG 2;
                                           DIP 2
                                               { DUP };
                                           DIG 2;
                                           PUSH nat 1;
                                           PAIR;
                                           DIP { SWAP };
                                           SWAP;
                                           DIP { SWAP };
                                           DIP 9
                                               { DUP };
                                           DIG 9;
                                           DIP { DIP { PAIR };
                                                 PAIR };
                                           SWAP;
                                           EXEC;
                                           DIP { PUSH nat 0;
                                                 PAIR;
                                                 SWAP };
                                           DIP 8
                                               { DUP };
                                           DIG 8;
                                           DIP { DIP { PAIR };
                                                 PAIR };
                                           SWAP;
                                           EXEC;
                                           SWAP;
                                           DUP;
                                           DIG 2;
                                           SWAP;
                                           CDR;
                                           CDR;
                                           CDR;
                                           ITER { DUP;
                                                  CAR;
                                                  DIP { CDR };
                                                  SWAP;
                                                  DIG 2;
                                                  DIP 2
                                                      { DUP };
                                                  DIG 2;
                                                  DIP 2
                                                      { DUP };
                                                  DIG 2;
                                                  PUSH nat 1;
                                                  PAIR;
                                                  DIP { SWAP };
                                                  SWAP;
                                                  DIP { SWAP };
                                                  DIP 9
                                                      { DUP };
                                                  DIG 9;
                                                  DIP { DIP { PAIR };
                                                        PAIR };
                                                  SWAP;
                                                  EXEC;
                                                  DIP { PUSH nat 0;
                                                        PAIR;
                                                        SWAP };
                                                  DIP 8
                                                      { DUP };
                                                  DIG 8;
                                                  DIP { DIP { PAIR };
                                                        PAIR };
                                                  SWAP;
                                                  EXEC };
                                           SWAP;
                                           DIP { SWAP };
                                           CAR;
                                           CDR;
                                           CDR;
                                           PAIR;
                                           DIP { DUP;
                                                 CDR;
                                                 CDR;
                                                 CAR;
                                                 CDR;
                                                 PUSH bool False };
                                           UPDATE;
                                           DIP { DUP;
                                                 DIP { CAR };
                                                 CDR;
                                                 DUP;
                                                 DIP { CAR };
                                                 CDR;
                                                 DUP;
                                                 DIP { CDR };
                                                 CAR;
                                                 DUP;
                                                 DIP { CAR };
                                                 CDR };
                                           SWAP;
                                           DROP;
                                           SWAP;
                                           PAIR;
                                           PAIR;
                                           SWAP;
                                           PAIR;
                                           SWAP;
                                           PAIR } }
                                    { DUG 4;
                                      DROP;
                                      SWAP;
                                      DROP } }
                               { DROP;
                                 SWAP;
                                 DROP } };
                     DIP { SWAP;
                           DROP };
                     SWAP;
                     PAIR }
                   { DUP;
                     CAR;
                     DIP { CDR;
                           DIP { DUP };
                           SWAP };
                     DROP;
                     CDR;
                     CDR;
                     CDR;
                     CAR;
                     DIP { AMOUNT };
                     TRANSFER_TOKENS;
                     NIL operation;
                     SWAP;
                     CONS;
                     PAIR } } } }
{ IF_LEFT { IF_LEFT { IF_LEFT { DIP { DUP;
                           CAR;
                           CDR;
                           CDR;
                           CDR;
                           IF_LEFT { DROP }
                                   { IF_LEFT { DROP }
                                             { PUSH string "MIGRATED";
                                               PAIR;
                                               FAILWITH } };
                           DUP;
                           CAR;
                           CDR;
                           CAR;
                           SENDER;
                           COMPARE;
                           EQ;
                           IF {  }
                              { UNIT;
                                PUSH string "NOT_ADMIN";
                                PAIR;
                                FAILWITH } };
                     LEFT address;
                     RIGHT unit;
                     DIP { DUP;
                           DIP { CDR };
                           CAR;
                           DUP;
                           DIP { CAR };
                           CDR;
                           DUP;
                           DIP { CAR };
                           CDR;
                           DUP;
                           DIP { CAR };
                           CDR };
                     SWAP;
                     DROP;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     PAIR;
                     NIL operation;
                     PAIR }
                   { DIP { DUP;
                           CAR;
                           CDR;
                           CDR;
                           CDR;
                           IF_LEFT { DROP }
                                   { IF_LEFT { DROP }
                                             { PUSH string "MIGRATED";
                                               PAIR;
                                               FAILWITH } };
                           DUP;
                           CAR;
                           CDR;
                           CAR;
                           SENDER;
                           COMPARE;
                           EQ;
                           IF {  }
                              { UNIT;
                                PUSH string "NOT_ADMIN";
                                PAIR;
                                FAILWITH } };
                     SWAP;
                     DIP { DUP;
                           CDR;
                           CAR;
                           DIP { DUP;
                                 CDR;
                                 CDR };
                           PAIR;
                           SWAP;
                           CAR };
                     DIP 4
                         { DUP };
                     DIG 4;
                     DIP { DIP { PAIR };
                           PAIR };
                     SWAP;
                     EXEC;
                     NIL operation;
                     PAIR } }
         { IF_LEFT { DIP { DUP };
                     SWAP;
                     DIP { DUP };
                     SWAP;
                     DUP;
                     CDR;
                     PACK;
                     SIZE;
                     DIP 2
                         { DUP };
                     DIG 2;
                     CDR;
                     CAR;
                     CDR;
                     CDR;
                     CDR;
                     CDR;
                     CDR;
                     DIP { DUP };
                     COMPARE;
                     GT;
                     IF { DIP 2
                              { DUP };
                          DIG 2;
                          CDR;
                          CAR;
                          CDR;
                          CDR;
                          DUP;
                          CAR;
                          CAR;
                          DIP { SWAP };
                          MUL;
                          SWAP;
                          CAR;
                          CDR;
                          CAR;
                          ADD;
                          DIP { DUP };
                          SWAP;
                          CAR;
                          SWAP;
                          COMPARE;
                          EQ;
                          IF { CDR;
                               CDR;
                               PUSH bool True;
                               SWAP;
                               ITER { IF_LEFT { CAR;
                                                DIP 2
                                                    { DUP };
                                                DIG 2;
                                                CDR;
                                                CAR;
                                                CDR;
                                                CDR;
                                                DIP { DUP };
                                                SWAP;
                                                DIP { DUP };
                                                SWAP;
                                                CDR;
                                                CDR;
                                                CAR;
                                                COMPARE;
                                                GE;
                                                IF { CDR;
                                                     CAR;
                                                     CDR;
                                                     COMPARE;
                                                     LE;
                                                     IF {  }
                                                        { DROP;
                                                          PUSH bool False } }
                                                   { DROP 3;
                                                     PUSH bool False } }
                                              { DROP } };
                               SWAP;
                               DROP }
                             { DROP 2;
                               PUSH bool False } }
                        { DROP 3;
                          PUSH bool False };
                     IF {  }
                        { UNIT;
                          PUSH string "FAIL_PROPOSAL_CHECK";
                          PAIR;
                          FAILWITH };
                     DIP { DUP };
                     SWAP;
                     CDR;
                     CDR;
                     CAR;
                     CDR;
                     SIZE;
                     PUSH nat 500;
                     COMPARE;
                     LE;
                     IF { UNIT;
                          PUSH string "MAX_PROPOSALS_REACHED";
                          PAIR;
                          FAILWITH }
                        {  };
                     DIP { DUP };
                     SWAP;
                     PUSH nat 0;
                     SENDER;
                     PAIR;
                     DIP { CAR;
                           CAR;
                           CAR };
                     GET;
                     IF_NONE { DUP;
                               CAR;
                               DIP { PUSH nat 0 };
                               PAIR;
                               PUSH string "FA2_INSUFFICIENT_BALANCE";
                               PAIR;
                               FAILWITH }
                             {  };
                     DIP { DUP };
                     SWAP;
                     CAR;
                     COMPARE;
                     GT;
                     IF { UNIT;
                          PUSH string "PROPOSAL_INSUFFICIENT_BALANCE";
                          PAIR;
                          FAILWITH }
                        {  };
                     DUP;
                     CAR;
                     DIP { SWAP };
                     SENDER;
                     SWAP;
                     DIG 2;
                     DIP 2
                         { DUP };
                     DIG 2;
                     DIP 2
                         { DUP };
                     DIG 2;
                     PUSH nat 0;
                     PAIR;
                     DIP { SWAP };
                     SWAP;
                     DIP { SWAP };
                     DIP 6
                         { DUP };
                     DIG 6;
                     DIP { DIP { PAIR };
                           PAIR };
                     SWAP;
                     EXEC;
                     DIP { PUSH nat 1;
                           PAIR;
                           SWAP };
                     DIP 5
                         { DUP };
                     DIG 5;
                     DIP { DIP { PAIR };
                           PAIR };
                     SWAP;
                     EXEC;
                     SWAP;
                     DIP { DUP };
                     SWAP;
                     DIP { DUP };
                     SWAP;
                     SENDER;
                     SWAP;
                     PAIR;
                     PACK;
                     BLAKE2B;
                     DIP { CDR;
                           CDR;
                           CAR;
                           CAR };
                     MEM;
                     IF { UNIT;
                          PUSH string "PROPOSAL_NOT_UNIQUE";
                          PAIR;
                          FAILWITH }
                        {  };
                     NOW;
                     PAIR;
                     DUP;
                     CAR;
                     PUSH nat 0;
                     PAIR;
                     PUSH nat 0;
                     PAIR;
                     DIP { DUP;
                           CDR;
                           CDR;
                           DIP { SENDER };
                           PAIR;
                           DIP { DUP;
                                 CDR;
                                 CAR;
                                 DIP { PUSH (list (pair address nat)) { } };
                                 PAIR };
                           PAIR };
                     PAIR;
                     DIP { SWAP };
                     SOME;
                     DIP 2
                         { DUP };
                     DIG 2;
                     CDR;
                     SENDER;
                     SWAP;
                     PAIR;
                     PACK;
                     BLAKE2B;
                     DUP;
                     DIP { DIP { DIP { DUP;
                                       CDR;
                                       CDR;
                                       CAR;
                                       CAR } };
                           UPDATE;
                           DIP { DUP;
                                 DIP { CAR };
                                 CDR;
                                 DUP;
                                 DIP { CAR };
                                 CDR;
                                 DUP;
                                 DIP { CDR };
                                 CAR;
                                 DUP;
                                 DIP { CDR };
                                 CAR };
                           SWAP;
                           DROP;
                           PAIR;
                           PAIR;
                           SWAP;
                           PAIR;
                           SWAP;
                           PAIR;
                           DUP;
                           CDR;
                           CDR;
                           CAR;
                           CDR };
                     DIP 3
                         { DUP };
                     DIG 3;
                     CAR;
                     PAIR;
                     PUSH bool True;
                     SWAP;
                     UPDATE;
                     DIP { DUP;
                           DIP { CAR };
                           CDR;
                           DUP;
                           DIP { CAR };
                           CDR;
                           DUP;
                           DIP { CDR };
                           CAR;
                           DUP;
                           DIP { CAR };
                           CDR };
                     SWAP;
                     DROP;
                     SWAP;
                     PAIR;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     CDR;
                     DROP;
                     NIL operation;
                     PAIR }
                   { DIP { DUP;
                           CAR;
                           CDR;
                           CDR;
                           CDR;
                           IF_LEFT { DROP }
                                   { IF_LEFT { DROP }
                                             { PUSH string "MIGRATED";
                                               PAIR;
                                               FAILWITH } };
                           DUP;
                           CAR;
                           CDR;
                           CAR;
                           SENDER;
                           COMPARE;
                           EQ;
                           IF {  }
                              { UNIT;
                                PUSH string "NOT_ADMIN";
                                PAIR;
                                FAILWITH } };
                     DUP;
                     PUSH nat 1000;
                     COMPARE;
                     LT;
                     IF { UNIT;
                          PUSH string "OUT_OF_BOUND_QUORUM_THRESHOLD";
                          PAIR;
                          FAILWITH }
                        { DUP;
                          PUSH nat 1;
                          COMPARE;
                          GT;
                          IF { UNIT;
                               PUSH string "OUT_OF_BOUND_QUORUM_THRESHOLD";
                               PAIR;
                               FAILWITH }
                             { DIP { DUP;
                                     DIP { CAR };
                                     CDR;
                                     DUP;
                                     DIP { CDR };
                                     CAR;
                                     DUP;
                                     DIP { CAR };
                                     CDR;
                                     DUP;
                                     DIP { CDR };
                                     CAR };
                               SWAP;
                               DROP;
                               PAIR;
                               SWAP;
                               PAIR;
                               PAIR;
                               SWAP;
                               PAIR;
                               NIL operation;
                               PAIR } } } } }
{ IF_LEFT { IF_LEFT { DIP { DUP;
                           CAR;
                           CDR;
                           CDR;
                           CDR;
                           IF_LEFT { DROP }
                                   { IF_LEFT { DROP }
                                             { PUSH string "MIGRATED";
                                               PAIR;
                                               FAILWITH } };
                           DUP;
                           CAR;
                           CDR;
                           CAR;
                           SENDER;
                           COMPARE;
                           EQ;
                           IF {  }
                              { UNIT;
                                PUSH string "NOT_ADMIN";
                                PAIR;
                                FAILWITH } };
                     DUP;
                     PUSH nat 2592000;
                     COMPARE;
                     LT;
                     IF { UNIT;
                          PUSH string "OUT_OF_BOUND_VOTING_PERIOD";
                          PAIR;
                          FAILWITH }
                        { DUP;
                          PUSH nat 1;
                          COMPARE;
                          GT;
                          IF { UNIT;
                               PUSH string "OUT_OF_BOUND_VOTING_PERIOD";
                               PAIR;
                               FAILWITH }
                             { DIP { DUP;
                                     DIP { CAR };
                                     CDR;
                                     DUP;
                                     DIP { CDR };
                                     CAR;
                                     DUP;
                                     DIP { CDR };
                                     CAR };
                               SWAP;
                               DROP;
                               PAIR;
                               PAIR;
                               SWAP;
                               PAIR;
                               NIL operation;
                               PAIR } } }
                   { DIP { DUP;
                           CAR;
                           CDR;
                           CAR;
                           SENDER;
                           COMPARE;
                           EQ;
                           IF {  }
                              { UNIT;
                                PUSH string "NOT_ADMIN";
                                PAIR;
                                FAILWITH } };
                     DUP;
                     CDR;
                     DIP { CAR;
                           CONTRACT %transfer (list (pair address (list (pair address (pair nat nat)))));
                           IF_NONE { UNIT;
                                     PUSH string "FAIL_TRANSFER_CONTRACT_TOKENS";
                                     PAIR;
                                     FAILWITH }
                                   {  };
                           PUSH mutez 0 };
                     TRANSFER_TOKENS;
                     NIL operation;
                     SWAP;
                     CONS;
                     PAIR } }
         { IF_LEFT { DIP { DUP;
                           CAR;
                           CDR;
                           CDR;
                           CDR;
                           IF_LEFT { DROP }
                                   { IF_LEFT { DROP }
                                             { PUSH string "MIGRATED";
                                               PAIR;
                                               FAILWITH } };
                           DUP;
                           CAR;
                           CDR;
                           CAR;
                           SENDER;
                           COMPARE;
                           EQ;
                           IF {  }
                              { UNIT;
                                PUSH string "NOT_ADMIN";
                                PAIR;
                                FAILWITH };
                           DUP;
                           DIP { CDR };
                           CAR;
                           DUP;
                           DIP { CAR };
                           CDR;
                           DUP;
                           DIP { CAR };
                           CDR;
                           DUP;
                           DIP { CDR };
                           CAR };
                     SWAP;
                     DROP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     PAIR;
                     NIL operation;
                     PAIR }
                   { DIP { DUP;
                           CAR;
                           CDR;
                           CDR;
                           CDR;
                           IF_LEFT { DROP }
                                   { IF_LEFT { DROP }
                                             { PUSH string "MIGRATED";
                                               PAIR;
                                               FAILWITH } } };
                     ITER { DUP;
                            CDR;
                            DIP { CAR };
                            IF_NONE { DIP { SENDER } }
                                    { DIP { DUP };
                                      SWAP;
                                      DIP { DIP { CHAIN_ID;
                                                  DIP { SELF;
                                                        ADDRESS };
                                                  PAIR;
                                                  DIP { DIP { DUP;
                                                              CDR;
                                                              CDR;
                                                              CDR;
                                                              CAR;
                                                              DUP;
                                                              DIP { PUSH nat 1;
                                                                    ADD;
                                                                    DIP { DUP;
                                                                          DIP { CAR };
                                                                          CDR;
                                                                          DUP;
                                                                          DIP { CAR };
                                                                          CDR;
                                                                          DUP;
                                                                          DIP { CAR };
                                                                          CDR;
                                                                          DUP;
                                                                          DIP { CDR };
                                                                          CAR };
                                                                    SWAP;
                                                                    DROP;
                                                                    PAIR;
                                                                    SWAP;
                                                                    PAIR;
                                                                    SWAP;
                                                                    PAIR;
                                                                    SWAP;
                                                                    PAIR } };
                                                        SWAP;
                                                        DIP { DUP };
                                                        PAIR };
                                                  PAIR;
                                                  SWAP;
                                                  DROP;
                                                  PACK;
                                                  DUP };
                                            SWAP;
                                            DIP { DUP };
                                            SWAP;
                                            DUP;
                                            CAR;
                                            DIP { CDR };
                                            CHECK_SIGNATURE;
                                            IF { SWAP;
                                                 DROP;
                                                 CAR;
                                                 HASH_KEY;
                                                 IMPLICIT_ACCOUNT;
                                                 ADDRESS }
                                               { DROP;
                                                 PUSH string "MISSIGNED";
                                                 PAIR;
                                                 FAILWITH } } };
                            DIP { SWAP;
                                  DUP };
                            SWAP;
                            DIP { DUP };
                            SWAP;
                            CAR;
                            DIP { CDR;
                                  CDR;
                                  CAR;
                                  CAR };
                            GET;
                            IF_NONE { UNIT;
                                      PUSH string "PROPOSAL_NOT_EXIST";
                                      PAIR;
                                      FAILWITH }
                                    {  };
                            DIP { DUP };
                            SWAP;
                            DIP { DUP };
                            SWAP;
                            DUP;
                            CAR;
                            CAR;
                            DIP { CAR;
                                  CDR;
                                  CAR };
                            ADD;
                            DIP { CDR;
                                  CDR };
                            ADD;
                            PUSH nat 1000;
                            COMPARE;
                            LT;
                            IF { UNIT;
                                 PUSH string "MAX_VOTES_REACHED";
                                 PAIR;
                                 FAILWITH }
                               {  };
                            DIP 2
                                { DUP };
                            DIG 2;
                            SWAP;
                            CAR;
                            CDR;
                            CDR;
                            SWAP;
                            CDR;
                            CAR;
                            CAR;
                            INT;
                            ADD;
                            NOW;
                            COMPARE;
                            GE;
                            IF { UNIT;
                                 PUSH string "VOTING_PERIOD_OVER";
                                 PAIR;
                                 FAILWITH }
                               {  };
                            DIP { DUP };
                            SWAP;
                            PUSH nat 0;
                            DIP 4
                                { DUP };
                            DIG 4;
                            PAIR;
                            DIP { CAR;
                                  CAR;
                                  CAR };
                            GET;
                            IF_NONE { DUP;
                                      CDR;
                                      CDR;
                                      DIP { PUSH nat 0 };
                                      PAIR;
                                      PUSH string "FA2_INSUFFICIENT_BALANCE";
                                      PAIR;
                                      FAILWITH }
                                    {  };
                            DIP { DUP };
                            SWAP;
                            CDR;
                            CDR;
                            COMPARE;
                            GT;
                            IF { UNIT;
                                 PUSH string "VOTING_INSUFFICIENT_BALANCE";
                                 PAIR;
                                 FAILWITH }
                               {  };
                            DIP { DUP };
                            SWAP;
                            DIP { DUP };
                            SWAP;
                            CAR;
                            DIP { CDR;
                                  CDR;
                                  CAR;
                                  CAR };
                            GET;
                            IF_NONE { UNIT;
                                      PUSH string "PROPOSAL_NOT_EXIST";
                                      PAIR;
                                      FAILWITH }
                                    {  };
                            DIG 2;
                            DIP 2
                                { DUP };
                            DIG 2;
                            CDR;
                            CDR;
                            DIP 4
                                { DUP };
                            DIG 4;
                            SWAP;
                            DIG 2;
                            DIP 2
                                { DUP };
                            DIG 2;
                            DIP 2
                                { DUP };
                            DIG 2;
                            PUSH nat 0;
                            PAIR;
                            DIP { SWAP };
                            SWAP;
                            DIP { SWAP };
                            DIP 8
                                { DUP };
                            DIG 8;
                            DIP { DIP { PAIR };
                                  PAIR };
                            SWAP;
                            EXEC;
                            DIP { PUSH nat 1;
                                  PAIR;
                                  SWAP };
                            DIP 7
                                { DUP };
                            DIG 7;
                            DIP { DIP { PAIR };
                                  PAIR };
                            SWAP;
                            EXEC;
                            DIG 2;
                            DIG 2;
                            DIP { DUP };
                            SWAP;
                            DUP;
                            DIP { CDR;
                                  CDR };
                            CDR;
                            CAR;
                            IF { DIP { DUP;
                                       CAR;
                                       CAR };
                                 ADD;
                                 DIP { DUP;
                                       DIP { CDR };
                                       CAR;
                                       DUP;
                                       DIP { CDR };
                                       CAR };
                                 SWAP;
                                 DROP;
                                 PAIR;
                                 PAIR }
                               { DIP { DUP;
                                       CAR;
                                       CDR;
                                       CAR };
                                 ADD;
                                 DIP { DUP;
                                       DIP { CDR };
                                       CAR;
                                       DUP;
                                       DIP { CAR };
                                       CDR;
                                       DUP;
                                       DIP { CDR };
                                       CAR };
                                 SWAP;
                                 DROP;
                                 PAIR;
                                 SWAP;
                                 PAIR;
                                 PAIR };
                            DIP { DUP };
                            SWAP;
                            CDR;
                            CDR;
                            DIP 4
                                { DUP };
                            DIG 4;
                            PAIR;
                            DIP { DUP;
                                  CDR;
                                  CDR;
                                  CDR };
                            CONS;
                            DIP { DUP;
                                  DIP { CAR };
                                  CDR;
                                  DUP;
                                  DIP { CAR };
                                  CDR;
                                  DUP;
                                  DIP { CAR };
                                  CDR };
                            SWAP;
                            DROP;
                            SWAP;
                            PAIR;
                            SWAP;
                            PAIR;
                            SWAP;
                            PAIR;
                            SWAP;
                            CAR;
                            DIP { DIP { DUP;
                                        CDR;
                                        CDR;
                                        CAR;
                                        CAR };
                                  SOME };
                            UPDATE;
                            DIP { DUP;
                                  DIP { CAR };
                                  CDR;
                                  DUP;
                                  DIP { CAR };
                                  CDR;
                                  DUP;
                                  DIP { CDR };
                                  CAR;
                                  DUP;
                                  DIP { CDR };
                                  CAR };
                            SWAP;
                            DROP;
                            PAIR;
                            PAIR;
                            SWAP;
                            PAIR;
                            SWAP;
                            PAIR;
                            SWAP;
                            DROP };
                     NIL operation;
                     PAIR } } } };
DIP { DROP 2 } };`