import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DistanceDto, DistanceService } from 'src/app/proxy/distances';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-distance',
  templateUrl: './distance.component.html',
  styleUrls: ['./distance.component.scss'],
  providers: [MessageService],
})
export class DistanceComponent implements OnInit {
  form: FormGroup;

  isModalOpen = false;

  distanceDialog: boolean = false;

  deleteDistanceDialog: boolean = false;

  distances: DistanceDto[] = [];

  distance: DistanceDto = {};

  cols: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private distanceService: DistanceService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAll();

    this.cols = [
      { field: 'libelle', header: 'Libelle' },
      { field: 'maxdistance', header: 'MaxDistance' },
      { field: 'mindistance', header: 'MinDistance' },
      { field: 'status', header: 'Status' },
    ];

    this.buildForm(); // Appeler buildForm ici pour initialiser le formulaire
  }

  buildForm() {
    this.form = this.fb.group({
      libelle: [this.distance.libelle || '', Validators.required],
      maxdistance: [this.distance.maxDistance || '', Validators.required],
      mindistance: [this.distance.minDistance || '', Validators.required],
      active: [this.distance.active],
    });
  }

  openNew() {
    this.distance = {};
    this.distance.active = true;
    this.buildForm();
    this.distanceDialog = true;
  }

  editDistance(distance: DistanceDto) {
    this.distanceService.getOneById(distance.id).subscribe((result) => {
      this.distance = { ...result };
      this.form.patchValue({
        libelle: this.distance.libelle,
        maxdistance: this.distance.maxDistance,
        mindistance: this.distance.minDistance,
        active: this.distance.active,
      });
      this.distanceDialog = true;
    });
  }

  deleteDistance(distance: DistanceDto) {
    this.deleteDistanceDialog = true;
    this.distance = { ...distance };
  }

  confirmDelete() {
    this.deleteDistanceDialog = false;
    this.distanceService.delete(this.distance.id).subscribe(
      () => {
        this.getAll();
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Distance supprimée',
          life: 3000,
        });
        this.distance = {};
      },
      (error) => {
        this.messageService.add({
          severity: 'danger',
          summary: 'Erreur',
          detail: 'Erreur de suppression',
          life: 3000,
        });
      }
    );
  }

  hideDialog() {
    this.distanceDialog = false;
  }

  saveDistance() {
    if (this.form.invalid) {
      // Gérer les erreurs de validation du formulaire si nécessaire
      return;
    }

    if (this.distance.id) {
      this.form.value.id = this.distance.id;
      this.distanceService.update(this.distance.id, this.form.value).subscribe(
        () => {
          this.distanceDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Distance mise à jour',
            life: 3000,
          });
          this.distance = {};
          this.getAll();
        },
        (error) => {
          this.messageService.add({
            severity: 'danger',
            summary: 'Erreur',
            detail: 'Erreur de mise à jour',
            life: 3000,
          });
        }
      );
    } else {
      this.distanceService.save(this.form.value).subscribe(
        () => {
          this.distanceDialog = false;
          this.getAll();
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Distance créée',
            life: 3000,
          });
          this.distance = {};
        },
        (error) => {
          this.messageService.add({
            severity: 'danger',
            summary: 'Erreur',
            detail: 'Erreur d\'enregistrement',
            life: 3000,
          });
        }
      );
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getAll() {
    this.distanceService.findAll().subscribe(
      (result) => {
        this.distances = result;
      },
      (error) => {
        this.messageService.add({
          severity: 'danger',
          summary: 'Erreur',
          detail: 'Erreur Serveur',
          life: 3000,
        });
      }
    );
  }
}
