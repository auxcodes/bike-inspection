import { Component, OnInit } from '@angular/core';
import { FieldsService } from '../../services/fields.service';
import { JsonField } from '../../shared/interfaces/json-field';
import { JsonGroup } from '../../shared/interfaces/json-group';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  fieldGroups: JsonGroup[] = [];
  editedGroups: JsonGroup[] = [];
  editMode = false;

  constructor(private fieldService: FieldsService) { }

  ngOnInit(): void {
    this.fieldService.fields.subscribe(fields => {
      this.fieldGroups = fields;
    });
  }

  onToggleEdit() {
    this.editMode = !this.editMode;
  }

  onAddField(event: any, groupId: number) {

    const id: string = event.target[0].value;
    const fieldId = "$" + id.replace(/\s+/g, '');
    const fieldName = event.target[0].value;
    const fieldText = event.target[1].value;

    const newField: JsonField = {
      id: fieldId,
      name: fieldName,
      selected: false,
      text: fieldText
    };

    this.addField(groupId, newField);
    
  }

  onAddGroup() {

  }

  onRemoveField() {

  }

  onRemoveGroup() {

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

    if (this.editedGroups.length === 0) {
      this.editedGroups = JSON.parse(JSON.stringify(this.fieldGroups));
    }

    this.editedGroups[groupId].fields.push(field);
  }
}
