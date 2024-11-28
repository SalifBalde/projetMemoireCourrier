import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // add this
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import {ThemeDto, ThemeService} from "../../../proxy/themes";

@Component({
    selector: 'app-theme',
    templateUrl: './theme.component.html',
    styleUrl: './theme.component.scss',
    providers: [MessageService],
})
export class ThemeComponent implements OnInit {
    form: FormGroup;

    isModalOpen = false;

    themeDialog: boolean = false;

    deleteThemeDialog: boolean = false;

    themes: ThemeDto[] = [];

    theme: ThemeDto = {};

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private themeService: ThemeService,
        private fb: FormBuilder,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.getAll();

        this.cols = [
            { field: 'libelle', header: 'Libelle' },
            { field: 'description', header: 'description' },
            // { field: 'status', header: 'status' },
        ];

    }


    buildForm() {
        this.form = this.fb.group({
            libelle: [this.theme.libelle || '', Validators.required],
            description: [this.theme.description || '', Validators.required],

        });
    }

    openNew() {
        this.theme = {};
        this.buildForm();
        this.themeDialog = true;
    }

    editTheme(theme: ThemeDto) {
        this.themeService.getOneById(theme.id).subscribe((theme) => {
            this.theme = { ...theme };
            this.buildForm();
            this.themeDialog = true;
        });
    }

    deleteTheme(theme: ThemeDto) {
        this.deleteThemeDialog = true;
        this.theme = { ...theme };
    }

    confirmDelete() {
        this.deleteThemeDialog = false;
        this.themeService
            .delete(this.theme.id)
            .subscribe(() => this.getAll());
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Theme Deleted',
            life: 3000,
        });
        this.theme = {};
    }

    hideDialog() {
        this.themeDialog = false;
    }

    saveTheme() {
        if (this.form.invalid) {
            return;
        }

        if (this.theme.id) {
            // @ts-ignore
            this.form.value.id = this.theme.id;
            this.themeService
                .update(this.theme.id, this.form.value)
                .subscribe(
                    () => {
                        this.themeDialog = false;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Theme Updated',
                            life: 3000,
                        });
                        this.theme = {};
                        this.getAll();
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'danger',
                            summary: 'Error',
                            detail: 'Erreur Modification',
                            life: 3000,
                        });
                        this.themeDialog = true;
                    }
                );
        } else {
            // @ts-ignore
            this.themeService.save(this.form.value).subscribe(
                () => {
                    this.themeDialog = false;
                    this.getAll();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Theme Created',
                        life: 3000,
                    });
                    this.theme = {};
                },
                (error) => {
                    this.messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: 'Erreur enregistrement',
                        life: 3000,
                    });
                    this.themeDialog = true;
                }
            );
        }

        //this.themes = [...this.themes];
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    getAll() {
        this.themeService.findAll().subscribe(
            (result) => {
                this.themes = result;
            },
            (error) => {
                this.messageService.add({
                    severity: 'danger',
                    summary: 'Error',
                    detail: 'Erreur Serveur',
                    life: 3000,
                });
            }
        );
    }
}
