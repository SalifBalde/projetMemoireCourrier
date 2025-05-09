"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CourrierOrdinaireComponent = void 0;
var core_1 = require("@angular/core");
var api_1 = require("primeng/api");
var forms_1 = require("@angular/forms");
var courrier_1 = require("src/app/proxy/courrier");
var CourrierOrdinaireComponent = /** @class */ (function () {
    function CourrierOrdinaireComponent(router, clientService, regimeService, paysService, categorieService, sessionService, courrierService, tarifService, taxeCourrierService, stocksService, fb, modePaiementService, messageService) {
        this.router = router;
        this.clientService = clientService;
        this.regimeService = regimeService;
        this.paysService = paysService;
        this.categorieService = categorieService;
        this.sessionService = sessionService;
        this.courrierService = courrierService;
        this.tarifService = tarifService;
        this.taxeCourrierService = taxeCourrierService;
        this.stocksService = stocksService;
        this.fb = fb;
        this.modePaiementService = modePaiementService;
        this.messageService = messageService;
        this.montant = 0;
        this.clients = [];
        this.courrier = new courrier_1.CourrierCreateUpdateDto();
        this.totalMontant = 0;
        this.taxe = 0;
        this.valeurTimbre = 0;
        this.fraisRecommande = 0;
        this.fraisAr = 0;
        this.fraisExpress = 0;
        this.fraisVd = 0;
        this.client = {};
        this.destinataire = {};
        this.label = 'RR';
    }
    CourrierOrdinaireComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g;
        this.paysService.findAll().subscribe(function (result) {
            _this.pays$ = result;
        });
        this.regimeService.findAll().subscribe(function (result) {
            _this.regime$ = result;
        });
        this.modePaiementService.findAll().subscribe(function (result) {
            _this.mode$ = result;
        });
        this.stocksService
            .getStocksByCaisseFigurine(this.sessionService.getAgentAttributes().caisseId)
            .subscribe(function (result) {
            //  this.stocksTimbre$ = result;
            _this.stocksTimbre$ = result.map(function (stock) { return (__assign(__assign({}, stock), { combinedLibelle: stock.produitLibelle + " " + stock.produitThemeLibelle + "  " + ("(" + stock.quantite + ")") })); });
        });
        this.buildForm();
        this.buildFormClient();
        this.buildFormDestinataire();
        (_a = this.form.get('typeId')) === null || _a === void 0 ? void 0 : _a.valueChanges.subscribe(function (typeId) {
            _this.updateServiceState(typeId);
        });
        (_b = this.form
            .get('regimeId')) === null || _b === void 0 ? void 0 : _b.valueChanges.subscribe(function () { return _this.calculateTariff(); });
        (_c = this.form
            .get('recommande')) === null || _c === void 0 ? void 0 : _c.valueChanges.subscribe(function () { return _this.calculateTariff(); });
        (_d = this.form
            .get('ar')) === null || _d === void 0 ? void 0 : _d.valueChanges.subscribe(function () { return _this.calculateTariff(); });
        (_e = this.form
            .get('express')) === null || _e === void 0 ? void 0 : _e.valueChanges.subscribe(function () { return _this.calculateTariff(); });
        // this.formClient.get('telephone')?.valueChanges.subscribe(() => this.searchClient());
        (_f = this.form
            .get('poids')) === null || _f === void 0 ? void 0 : _f.valueChanges.subscribe(function (value) { return _this.poidsChange(value); });
        (_g = this.form
            .get('paysDestinationId')) === null || _g === void 0 ? void 0 : _g.valueChanges.subscribe(function (value) { return _this.paysChange(value); });
        this.getCatgories(this.form.get('regimeId').value);
        //this.choixRegime();
    };
    CourrierOrdinaireComponent.prototype.validateMontant = function (form) {
        var _a, _b;
        var totalMontant = ((_a = form.get('totalMontant')) === null || _a === void 0 ? void 0 : _a.value) || 0;
        var valeurTimbre = ((_b = form.get('valeurTimbre')) === null || _b === void 0 ? void 0 : _b.value) || 0;
        return totalMontant === valeurTimbre ? null : { montantMismatch: true };
    };
    CourrierOrdinaireComponent.prototype.getAllDestinataire = function () {
        var _this = this;
        var paysId = this.form.get('paysDestinationId').value;
        this.courrierService
            .getAllDestinataires(this.client.id, paysId)
            .subscribe(function (result) {
            _this.clients = result;
        });
    };
    CourrierOrdinaireComponent.prototype.choisirDestinataire = function (client) {
        this.destinataire = client;
        this.destinataireDialog = false;
        this.form.patchValue({
            destinataireId: client.id
        });
    };
    CourrierOrdinaireComponent.prototype.buildForm = function () {
        var _a, _b, _c, _d;
        this.form = this.fb.group({
            modePaiementId: ['', forms_1.Validators.required],
            regimeId: ['', forms_1.Validators.required],
            poids: ['', forms_1.Validators.required],
            expediteurId: ['', forms_1.Validators.required],
            destinataireId: ['', forms_1.Validators.required],
            paysDestinationId: [210, forms_1.Validators.required],
            codeBarre: [
                { value: '', disabled: true },
                [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(9),
                    forms_1.Validators.maxLength(9),
                    forms_1.Validators.pattern(/^\d{9}$/),
                ],
            ],
            valeurDeclare: [{ value: '', disabled: true }],
            contenu: [''],
            timbreId: [''],
            typeId: ['1'],
            quantite: ['1'],
            categorieId: ['', forms_1.Validators.required],
            typeCourrierId: ['1'],
            recommande: [{ value: false, disabled: true }],
            ar: [{ value: false, disabled: true }],
            express: [{ value: false, disabled: true }],
            statutCourrierId: ['1'],
            paysOrigineId: [210],
            caisseId: [
                (_a = this.sessionService.getAgentAttributes()) === null || _a === void 0 ? void 0 : _a.caisseId,
                forms_1.Validators.required,
            ],
            structureDepotId: [
                (_b = this.sessionService.getAgentAttributes()) === null || _b === void 0 ? void 0 : _b.structureId,
                forms_1.Validators.required,
            ],
            journalId: [
                (_c = this.sessionService.getJournalAttributes()) === null || _c === void 0 ? void 0 : _c.id,
                forms_1.Validators.required,
            ],
            totalMontant: [0],
            valeurTimbre: [0]
        }, { validators: this.validateMontant });
        var journalId = (_d = this.form.get('journalId')) === null || _d === void 0 ? void 0 : _d.value;
        if (!journalId) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Avertissement',
                detail: 'Vous n\'avez pas de caisse. Demandez à votre supérieur de vous attribuer une caisse.'
            });
        }
    };
    CourrierOrdinaireComponent.prototype.buildFormClient = function () {
        this.formClient = this.fb.group({
            nom: [this.client.nom || '', forms_1.Validators.required],
            prenom: [this.client.prenom || '', forms_1.Validators.required],
            adresse: [this.client.adresse || '', forms_1.Validators.required],
            codePostal: [this.client.codePostal || '', forms_1.Validators.required],
            telephone: [this.client.telephone || '', forms_1.Validators.required],
            email: [this.client.email]
        });
    };
    CourrierOrdinaireComponent.prototype.buildFormDestinataire = function () {
        this.formDestinataire = this.fb.group({
            nom: [this.destinataire.nom || '', forms_1.Validators.required],
            prenom: [this.destinataire.prenom || '', forms_1.Validators.required],
            adresse: [this.destinataire.adresse || '', forms_1.Validators.required],
            codePostal: [
                this.destinataire.codePostal || '',
                forms_1.Validators.required,
            ],
            telephone: [this.destinataire.telephone || '', forms_1.Validators.required],
            email: [this.destinataire.email]
        });
    };
    CourrierOrdinaireComponent.prototype.openClient = function () {
        this.clientDialog = true;
    };
    CourrierOrdinaireComponent.prototype.openDestinataire = function () {
        this.destinataireDialog = true;
        this.getAllDestinataire();
    };
    CourrierOrdinaireComponent.prototype.searchClient = function () {
        var _this = this;
        var keyword = this.formClient.get('telephone').value;
        if ((keyword === null || keyword === void 0 ? void 0 : keyword.length) > 8) {
            this.loading = true;
            this.client = {};
            this.clientService.searchClient(keyword).subscribe(function (client) {
                var _a;
                _this.client = __assign({}, client);
                _this.form.patchValue({
                    expediteurId: ((_a = _this.client) === null || _a === void 0 ? void 0 : _a.id) || ''
                });
                _this.loading = false;
                _this.buildFormClient();
                _this.clientDialog = true;
            }, function (error) {
                _this.loading = false;
                _this.client = {};
                _this.formClient.reset();
                _this.formClient.patchValue({
                    telephone: keyword
                });
                _this.clientDialog = true;
            });
        }
    };
    CourrierOrdinaireComponent.prototype.calculateTaxVd = function () {
        var _a;
        var taxeParDefaut = 1500;
        var taxeSupplementaire = 250;
        var valeurDeclaree = ((_a = this.form.get('valeurDeclare')) === null || _a === void 0 ? void 0 : _a.value) || 0;
        // Calcul des tranches
        var tranches = Math.ceil(valeurDeclaree / 10000);
        // Calcul du total des taxes
        var taxeTotale = tranches * taxeSupplementaire;
        // Appliquer la logique de taxe minimale
        this.fraisVd = taxeTotale > taxeParDefaut ? taxeTotale : taxeParDefaut;
        // Mettre à jour le montant total
        this.calculateTariff();
    };
    CourrierOrdinaireComponent.prototype.searchDestinataire = function () {
        var _this = this;
        var keyword = this.formDestinataire.get('telephone').value;
        if ((keyword === null || keyword === void 0 ? void 0 : keyword.length) > 8) {
            this.loading = true;
            this.destinataire = {};
            this.clientService.searchClient(keyword).subscribe(function (client) {
                var _a;
                _this.destinataire = __assign({}, client);
                _this.form.patchValue({
                    destinataireId: (_a = _this.destinataire) === null || _a === void 0 ? void 0 : _a.id
                });
                _this.loading = false;
                _this.buildFormDestinataire();
                _this.destinataireDialog = true;
            }, function (error) {
                _this.loading = false;
                _this.destinataire = {};
                _this.formDestinataire.reset();
                _this.formDestinataire.patchValue({
                    telephone: keyword
                });
                //this.buildFormClient();
                _this.destinataireDialog = true;
            });
        }
    };
    CourrierOrdinaireComponent.prototype.calculateTariff = function () {
        var _a, _b, _c, _d, _e;
        var regimeId = (_a = this.form.get('regimeId')) === null || _a === void 0 ? void 0 : _a.value;
        var isRecommande = (_b = this.form.get('recommande')) === null || _b === void 0 ? void 0 : _b.value;
        var isAr = (_c = this.form.get('ar')) === null || _c === void 0 ? void 0 : _c.value;
        var isExpress = (_d = this.form.get('express')) === null || _d === void 0 ? void 0 : _d.value;
        if (regimeId) {
            var selectedRegime = this.regime$.find(function (regime) { return regime.id === regimeId; });
            if (selectedRegime) {
                var totalTax = 0;
                this.fraisAr = 0;
                this.fraisExpress = 0;
                // Ajouter les frais pour les services sélectionnés
                if (isRecommande) {
                    var recommandeTarif = selectedRegime.tarifs.find(function (tarif) { return tarif.serviceLibelle === 'Recommander'; });
                    if (recommandeTarif) {
                        this.fraisRecommande = recommandeTarif.taxe;
                        totalTax += recommandeTarif.taxe;
                    }
                }
                if (isAr) {
                    var arTarif = selectedRegime.tarifs.find(function (tarif) { return tarif.serviceLibelle === 'Accusé Réception'; });
                    if (arTarif) {
                        this.fraisAr = arTarif.taxe;
                        totalTax += arTarif.taxe;
                    }
                }
                if (isExpress) {
                    var expressTarif = selectedRegime.tarifs.find(function (tarif) { return tarif.serviceLibelle === 'Express'; });
                    if (expressTarif) {
                        this.fraisExpress = expressTarif.taxe;
                        totalTax += expressTarif.taxe;
                    }
                }
                // Ajouter les frais de valeur déclarée
                totalTax += this.fraisVd;
                // Calculer le montant total
                this.totalMontant = totalTax + this.montant;
                (_e = this.form.get('totalMontant')) === null || _e === void 0 ? void 0 : _e.setValue(this.totalMontant);
            }
        }
    };
    CourrierOrdinaireComponent.prototype.choixRegime = function () {
        var _a, _b, _c, _d, _e;
        var regimeId = (_a = this.form.get('regimeId')) === null || _a === void 0 ? void 0 : _a.value;
        if (regimeId === 1) {
            (_b = this.form.get('paysDestinationId')) === null || _b === void 0 ? void 0 : _b.setValue(210);
            (_c = this.form.get('paysDestinationId')) === null || _c === void 0 ? void 0 : _c.disable();
        }
        else {
            (_d = this.form.get('paysDestinationId')) === null || _d === void 0 ? void 0 : _d.enable();
            (_e = this.form.get('paysDestinationId')) === null || _e === void 0 ? void 0 : _e.reset();
            // Supprimer le pays avec l'ID 210 si le régime est 2
            if (regimeId === 2) {
                this.filteredCountries = this.pays$.filter(function (country) { return country.id !== 210; });
            }
            else {
                this.filteredCountries = this.pays$;
            }
        }
        this.form.updateValueAndValidity();
        this.getCatgories(regimeId);
    };
    CourrierOrdinaireComponent.prototype.getCatgories = function (regimeId) {
        var _this = this;
        var serviceId = this.form.get("typeId").value;
        this.categorieService
            .getAllByRegimeAndType(regimeId, 1, serviceId)
            .subscribe(function (result) {
            _this.categorie$ = result;
            _this.categorie$ = _this.categorie$.filter(function (c) { return c.entrant == false; });
        });
    };
    CourrierOrdinaireComponent.prototype.updateServiceState = function (typeId) {
        var formControls = this.form.controls;
        // Désactivation par défaut des champs
        formControls['recommande'].disable();
        formControls['ar'].disable();
        formControls['express'].disable();
        formControls['valeurDeclare'].disable();
        formControls['codeBarre'].disable();
        // Suppression des validations par défaut
        formControls['valeurDeclare'].setValidators(null);
        formControls['codeBarre'].setValidators(null);
        switch (typeId) {
            case '1':
                formControls['recommande'].setValue(false);
                formControls['ar'].setValue(false);
                formControls['express'].setValue(false);
                formControls['valeurDeclare'].setValue('0');
                this.fraisAr = 0;
                this.fraisExpress = 0;
                this.fraisRecommande = 0;
                this.totalMontant = this.montant;
                this.label = 'RR';
                break;
            case '2':
                formControls['recommande'].setValue(true);
                formControls['ar'].enable();
                formControls['ar'].setValue(false);
                formControls['express'].enable();
                formControls['express'].setValue(false);
                formControls['codeBarre'].enable();
                formControls['codeBarre'].setValidators(forms_1.Validators.required);
                this.fraisAr = 0;
                this.fraisExpress = 0;
                this.label = 'RR';
                break;
            case '3':
                formControls['recommande'].setValue(true);
                formControls['ar'].setValue(false);
                formControls['ar'].enable();
                formControls['express'].setValue(false);
                formControls['express'].enable();
                formControls['valeurDeclare'].enable();
                formControls['valeurDeclare'].setValidators(forms_1.Validators.required);
                formControls['codeBarre'].enable();
                formControls['codeBarre'].setValidators(forms_1.Validators.required);
                this.fraisAr = 0;
                this.fraisExpress = 0;
                this.label = 'VV';
                break;
            default:
                break;
        }
        // Mise à jour de la validation pour appliquer les changements
        formControls['valeurDeclare'].updateValueAndValidity();
        formControls['codeBarre'].updateValueAndValidity();
        formControls['recommande'].updateValueAndValidity();
    };
    CourrierOrdinaireComponent.prototype.paysChange = function (value) {
        var _this = this;
        var _a;
        var poids = (_a = this.form.get('poids')) === null || _a === void 0 ? void 0 : _a.value;
        if (value > 0 && poids > 0) {
            this.taxeCourrierService
                .getTarif(value, poids)
                .subscribe(function (result) {
                var _a;
                _this.montant = result;
                // Mise à jour du montant total en incluant les frais recommandés
                _this.totalMontant = +_this.montant + _this.fraisRecommande;
                // Appel de calculateTariff pour prendre en compte tous les frais supplémentaires
                _this.calculateTariff();
                // Mise à jour du champ totalMontant dans le formulaire
                (_a = _this.form.get('totalMontant')) === null || _a === void 0 ? void 0 : _a.setValue(_this.totalMontant);
            });
        }
        else {
            // Si le poids ou le pays de destination ne sont pas valides
            this.montant = 0;
            this.totalMontant = this.montant; // Reset du montant total
        }
        this.form.updateValueAndValidity();
    };
    CourrierOrdinaireComponent.prototype.poidsChange = function (value) {
        var _this = this;
        var _a;
        var paysDestinationId = (_a = this.form.get('paysDestinationId')) === null || _a === void 0 ? void 0 : _a.value;
        var pays = this.pays$.find(function (p) { return p.id === paysDestinationId; });
        var poidsMax = pays.zonePoidsMax;
        if (poidsMax !== undefined && value > poidsMax) {
            this.messageService.add({
                severity: 'error',
                summary: 'Poids invalide',
                detail: "Le poids ne doit pas d\u00E9passer " + poidsMax + " kg."
            });
            this.totalMontant = 0;
            return;
        }
        // Si le poids et le pays de destination sont valides
        if (value > 0 && paysDestinationId > 0) {
            // Appel du service pour obtenir le tarif
            this.taxeCourrierService
                .getTarif(paysDestinationId, value)
                .subscribe(function (result) {
                var _a;
                _this.montant = result; // Mise à jour du montant
                // Mise à jour du montant total en incluant les frais recommandés
                _this.totalMontant = +_this.montant + _this.fraisRecommande;
                // Appel de calculateTariff pour prendre en compte tous les frais supplémentaires
                _this.calculateTariff();
                // Mise à jour du champ totalMontant dans le formulaire
                (_a = _this.form.get('totalMontant')) === null || _a === void 0 ? void 0 : _a.setValue(_this.totalMontant);
            });
        }
        else {
            // Si le poids ou le pays de destination ne sont pas valides
            this.montant = 0;
            this.totalMontant = this.montant; // Reset du montant total
        }
        // Toujours mettre à jour la validité du formulaire après chaque changement
        this.form.updateValueAndValidity();
    };
    CourrierOrdinaireComponent.prototype.saveColis = function () {
        var _this = this;
        var _a, _b, _c, _d;
        if (this.form.invalid) {
            return;
        }
        (_a = this.form.get('recommande')) === null || _a === void 0 ? void 0 : _a.enable();
        (_b = this.form.get('paysDestinationId')) === null || _b === void 0 ? void 0 : _b.enable();
        this.form.value.userId = this.sessionService.getAgentAttributes().id;
        this.form.value.montant = this.totalMontant;
        this.form.value.details = this.courrier.details;
        if ((_c = this.form.get('recommande')) === null || _c === void 0 ? void 0 : _c.value)
            this.form.value.codeBarre =
                this.label + ((_d = this.form.get('codeBarre')) === null || _d === void 0 ? void 0 : _d.value) + 'SN';
        this.loading = true;
        this.courrierService.save(this.form.value).subscribe(function (result) {
            _this.courrier = result;
            _this.loading = false;
            _this.router.navigateByUrl('/guichet/courrier-details/' + _this.courrier.id);
        }, function (error) {
            _this.messageService.add({
                severity: 'danger',
                summary: 'Error',
                detail: 'Erreur enregistrement',
                life: 3000
            });
            _this.loading = false;
        });
    };
    CourrierOrdinaireComponent.prototype.hideDialog = function () {
        this.clientDialog = false;
        this.destinataireDialog = false;
    };
    CourrierOrdinaireComponent.prototype.saveClient = function () {
        var _this = this;
        if (this.formClient.invalid) {
            return;
        }
        if (this.client.id) {
            this.formClient.value.id = this.client.id;
            this.clientService
                .update(this.client.id, this.formClient.value)
                .subscribe(function (result) {
                var _a;
                _this.client = result;
                _this.form.patchValue({
                    expediteurId: ((_a = _this.client) === null || _a === void 0 ? void 0 : _a.id) || ''
                });
                _this.clientDialog = false;
                _this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Client Updated',
                    life: 3000
                });
                // this.client = {};
            }, function (error) {
                _this.messageService.add({
                    severity: 'danger',
                    summary: 'Error',
                    detail: 'Erreur Modification',
                    life: 3000
                });
                _this.clientDialog = true;
            });
        }
        else {
            this.clientService.save(this.formClient.value).subscribe(function (result) {
                var _a;
                _this.client = result;
                _this.form.patchValue({
                    expediteurId: ((_a = _this.client) === null || _a === void 0 ? void 0 : _a.id) || ''
                });
                _this.loading = false;
                _this.clientDialog = false;
                _this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Client Created',
                    life: 3000
                });
                //    this.client = {};
            }, function (error) {
                _this.messageService.add({
                    severity: 'danger',
                    summary: 'Error',
                    detail: 'Erreur enregistrement',
                    life: 3000
                });
                _this.clientDialog = true;
            });
        }
    };
    CourrierOrdinaireComponent.prototype.saveDestinataire = function () {
        var _this = this;
        if (this.formDestinataire.invalid) {
            return;
        }
        if (this.destinataire.id) {
            this.formDestinataire.value.id = this.destinataire.id;
            this.clientService
                .update(this.destinataire.id, this.formDestinataire.value)
                .subscribe(function (result) {
                var _a;
                _this.destinataireDialog = false;
                _this.destinataire = __assign({}, result);
                _this.form.patchValue({
                    destinataireId: ((_a = _this.destinataire) === null || _a === void 0 ? void 0 : _a.id) || ''
                });
                _this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Client Updated',
                    life: 3000
                });
                // this.client = {};
            }, function (error) {
                _this.messageService.add({
                    severity: 'danger',
                    summary: 'Error',
                    detail: 'Erreur Modification',
                    life: 3000
                });
                _this.destinataireDialog = true;
            });
        }
        else {
            this.clientService.save(this.formDestinataire.value).subscribe(function (result) {
                var _a;
                _this.destinataire = result;
                _this.loading = false;
                _this.destinataireDialog = false;
                _this.form.patchValue({
                    destinataireId: ((_a = _this.destinataire) === null || _a === void 0 ? void 0 : _a.id) || ''
                });
                _this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Client Created',
                    life: 3000
                });
                //    this.client = {};
            }, function (error) {
                _this.messageService.add({
                    severity: 'danger',
                    summary: 'Error',
                    detail: 'Erreur enregistrement',
                    life: 3000
                });
                _this.destinataireDialog = true;
            });
        }
    };
    //Panier Timbre
    CourrierOrdinaireComponent.prototype.updateMetrics = function () {
        var _a;
        this.numberOfItems = this.courrier.details.length;
        this.valeurTimbre = this.courrier.details.reduce(function (sum, detail) { return sum + (detail.quantite || 0) * (detail.prix || 0); }, 0);
        (_a = this.form.get('valeurTimbre')) === null || _a === void 0 ? void 0 : _a.setValue(this.valeurTimbre);
        this.form.updateValueAndValidity();
    };
    CourrierOrdinaireComponent.prototype.getTarifProduit = function () { };
    CourrierOrdinaireComponent.prototype.onQuantiteChange = function (event) {
        this.checkAndAddProduct();
    };
    CourrierOrdinaireComponent.prototype.checkAndAddProduct = function () {
        if (this.selectedTimbre && this.selectedQuantite > 0) {
            this.ajouterProduit();
        }
    };
    CourrierOrdinaireComponent.prototype.ajouterProduit = function () {
        var quantite = this.form.value.quantite;
        var timbreId = this.form.value.timbreId;
        this.selectedTimbre = this.stocksTimbre$.find(function (p) { return p.id === timbreId; });
        // this.selectedTimbre = this.stocksTimbre$.find((p) => p.produitId === timbreId);
        if (quantite > this.selectedTimbre.quantite) {
            console.error('Quantité saisie supérieure au stock disponible.');
            return;
        }
        if (quantite > 0) {
            this.courrier.details.push({
                produitId: this.selectedTimbre.id,
                produitLibelle: this.selectedTimbre.combinedLibelle,
                quantite: quantite,
                prix: this.selectedTimbre.produitPrix
            });
            this.updateMetrics();
            this.resetSelection();
        }
    };
    CourrierOrdinaireComponent.prototype.removeDetail = function (index) {
        this.courrier.details.splice(index, 1);
        this.updateMetrics();
    };
    CourrierOrdinaireComponent.prototype.incrementQuantity = function (index) {
        if (this.courrier.details[index].quantite < 100) {
            this.courrier.details[index].quantite++;
            this.updateMetrics();
        }
    };
    CourrierOrdinaireComponent.prototype.decrementQuantity = function (index) {
        if (this.courrier.details[index].quantite > 1) {
            this.courrier.details[index].quantite--;
            this.updateMetrics();
        }
    };
    CourrierOrdinaireComponent.prototype.resetSelection = function () {
        var _a, _b;
        (_a = this.form.get('timbreId')) === null || _a === void 0 ? void 0 : _a.reset();
        (_b = this.form.get('quantite')) === null || _b === void 0 ? void 0 : _b.reset();
        this.selectedTimbre = null;
    };
    CourrierOrdinaireComponent = __decorate([
        core_1.Component({
            selector: 'app-courrier-ordinaire',
            templateUrl: './courrier-ordinaire.component.html',
            styleUrl: './courrier-ordinaire.component.scss',
            providers: [api_1.MessageService]
        })
    ], CourrierOrdinaireComponent);
    return CourrierOrdinaireComponent;
}());
exports.CourrierOrdinaireComponent = CourrierOrdinaireComponent;
