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
  fields: JsonField[] = [];

  constructor(private fieldService: FieldsService) { }

  ngOnInit(): void {
    this.fieldService.fields.subscribe(fields => {
      this.fieldGroups = fields;
    });
  }

  onAddField() {

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
    // backup last version
      // check history to see if there is any reference to version

    // save new version locally and in the cloud

  }

}
