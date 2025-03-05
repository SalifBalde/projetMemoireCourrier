import { Injectable } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Injectable({
  providedIn: 'root' // Disponible partout dans l'application
})
export class PrimeNgConfigService {
  constructor(private primengConfig: PrimeNGConfig) {}

  initialize() {
    this.primengConfig.setTranslation({
        startsWith: 'Commence par',
        contains: 'Contient',
        notContains: 'Ne contient pas',
        endsWith: 'Se termine par',
        equals: 'Égal à',
        notEquals: 'Différent de',
        noFilter: 'Aucun filtre',
        lt: 'Inférieur à',
        lte: 'Inférieur ou égal à',
        gt: 'Supérieur à',
        gte: 'Supérieur ou égal à',
        is: 'Est',
        isNot: "N'est pas",
        before: 'Avant',
        after: 'Après',
        clear: 'Effacer',
        apply: 'Appliquer',
        matchAll: 'Correspond à tous',
        matchAny: 'Correspond à un',
        addRule: 'Ajouter une règle',
        removeRule: 'Supprimer une règle',
        accept: 'Oui',
        reject: 'Non',
        choose: 'Choisir',
        upload: 'Téléverser',
        cancel: 'Annuler',
      firstDayOfWeek: 1,
      dayNames: [
        'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'
      ],
      dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
      monthNames: [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
      ],
      monthNamesShort: [
        'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin',
        'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'
      ],
      today: 'Aujourd\'hui',
      dateFormat: 'dd/mm/yy',
      weekHeader: 'Sem',
      weak: 'Faible',
      medium: 'Moyen',
      strong: 'Fort',
      passwordPrompt: 'Saisissez un mot de passe'
    });
  }
}
