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

  constructor(private fieldService: FieldsService) { }

  ngOnInit(): void {
    this.fieldService.fields.subscribe(fields => {
      this.backupGroups = fields;
    });

    if (this.fieldGroups.length === 0) {
      this.fieldGroups = JSON.parse(JSON.stringify(this.backupGroups));
    }
  }

  ngAfterViewChecked() {
    if (this.groupAdded) {
      this.scrollToEnd();
      this.groupAdded = false;
    }
  }

  onToggleEdit() {
    this.editMode = !this.editMode;
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
  }

  onDeleteField(fieldId: string, groupId: number) {
    const fieldIndex = this.fieldIndex(fieldId, groupId);
    this.fieldGroups[groupId].fields.splice(fieldIndex, 1);
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
    // After group is added AfterViewIsChecked will scroll to end of page
  }

  private scrollToEnd() {
    const pageHeight = document.getElementById('header').scrollHeight + document.getElementById('editorSection').scrollHeight + document.getElementById('footer').scrollHeight;
    window.scroll(0, pageHeight);
  }

  onDeleteGroup(groupId: number) {
    this.fieldGroups.splice(groupId, 1);
  }

  onToggleExtraNotes() {

  }

  onSaveChanges() {
    this.onToggleEdit();
    // backup last version
    // check history to see if there is any reference to version

    // save new version locally and in the cloud

  }

  private addField(groupId: number, field: JsonField) {

    this.fieldGroups[groupId].fields.push(field);
  }
}
