import { AfterViewChecked, Component, OnChanges, OnInit } from '@angular/core';
import { FieldsService } from '../../services/fields.service';
import { JsonField } from '../../shared/interfaces/json-field';
import { JsonGroup } from '../../shared/interfaces/json-group';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterViewChecked {

  fieldGroups: JsonGroup[] = [];
  backupGroups: JsonGroup[] = [];
  editMode = false;
  editingField: { groupIndex: number; fieldIndex: number; field: JsonField } = null;
  groupAdded = false;
  unsaved = false;

  constructor(private fieldService: FieldsService) { }

  ngOnInit(): void {
    this.fieldService.fields.subscribe(fields => {
      this.backupGroups = fields;
    });

    if (this.fieldGroups.length === 0) {
      this.fieldGroups = this.deepCopy(this.backupGroups);
    }
  }

  private deepCopy(toCopyFrom: JsonGroup[]) {
    return JSON.parse(JSON.stringify(toCopyFrom));
  }

  ngAfterViewChecked() {
    if (this.groupAdded) {
      this.scrollToEnd();
      this.groupAdded = false;
    }
  }

  onToggleEdit() {
    this.editMode = !this.editMode;
    if (this.fieldGroups.length === 0) {
      this.fieldGroups = this.deepCopy(this.backupGroups);
    }
  }

  onAddField(event: any, groupId: number) {
    const id: string = event.target[0].value;
    const fieldId = "$" + id.replace(/\s+/g, '');
    const fieldName: string = event.target[0].value;
    const fieldText: string = event.target[1].value;

    const newField: JsonField = {
      id: fieldId,
      name: id,
      selected: false,
      text: fieldName,
      value: fieldText
    };

    this.addField(groupId, newField);
    this.unsaved = true;
  }

  onDeleteField(fieldId: string, groupId: number) {
    const fieldIndex = this.fieldIndex(fieldId, groupId);
    this.fieldGroups[groupId].fields.splice(fieldIndex, 1);
    this.unsaved = true;
  }

  onFieldChange(event: any, groupId: number) {
    const id = event.target.id;
    if (this.editingField === null || this.editingField.field.id !== id) {
      this.editingField = {
        groupIndex: groupId,
        fieldIndex: this.fieldIndex(event.target.id, groupId),
        field: this.fieldGroups[groupId].fields.find(field => field.id === event.target.id)
      }
      this.updateField(this.editingField);
    }
    else {
      this.updateField(this.editingField);
    }
    this.unsaved = true;
  }

  private updateField(field: any) {
    this.fieldGroups[field.groupIndex].fields[field.fieldIndex] = field.field;
  }

  private fieldIndex(fieldId: string, groupId: number) {
    return this.fieldGroups[groupId].fields.findIndex(field => field.id === fieldId)
  }

  onAddGroup() {
    this.fieldGroups.push(
      {
        groupId: "$newGroup",
        groupLabel: "New Group",
        fields: []
      }
    );
    this.editMode = true;
    this.groupAdded = true;
    this.unsaved = true;
    // After group is added AfterViewIsChecked will scroll to end of page
  }

  onGroupChange(event: any, groupId: number) {
    this.fieldGroups[groupId].groupLabel = event.target.value;
    const id = event.target.value.replace(/\s+/g, '')
    this.fieldGroups[groupId].groupId = id;
    this.unsaved = true;
  }

  private scrollToEnd() {
    const pageHeight = document.getElementById('header').scrollHeight + document.getElementById('editorSection').scrollHeight + document.getElementById('footer').scrollHeight;
    window.scroll(0, pageHeight);
  }

  onDeleteGroup(groupId: number) {
    this.fieldGroups.splice(groupId, 1);
    this.unsaved = true;
  }

  onToggleExtraNotes() {

  }

  onSaveChanges() {
    this.onToggleEdit();
    this.unsaved = false;
    // backup last version
    // check history to see if there is any reference to version

    // save new version locally and in the cloud

  }

  onCancelEdit() {
    this.fieldGroups = this.deepCopy(this.backupGroups);
    this.onToggleEdit();
    this.unsaved = false;
  }

  private addField(groupId: number, field: JsonField) {
    this.fieldGroups[groupId].fields.push(field);
  }
}
