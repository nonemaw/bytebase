import { Database, DatabaseId, Table, TableId } from ".";

export enum UIEditorTabType {
  TabForDatabase = "database",
  TabForTable = "table",
}

// Tab context for editing database.
export interface DatabaseTabContext {
  id: string;
  type: UIEditorTabType.TabForDatabase;
  databaseId: DatabaseId;
}

// Tab context for editing table.
export interface TableTabContext {
  id: string;
  type: UIEditorTabType.TabForTable;
  databaseId: DatabaseId;
  tableId: TableId;
  // Save the reference for those new tables.
  table: Table;
  // Save the editing table cache in tab.
  tableCache: Table;
}

export type TabContext = DatabaseTabContext | TableTabContext;

type TabId = string;

export interface UIEditorState {
  tabState: {
    tabMap: Map<TabId, TabContext>;
    currentTabId?: TabId;
  };
  databaseList: Database[];
  tableList: Table[];
  droppedTableList: Table[];
}

/**
 * Type definition for API message.
 */
export interface DatabaseEdit {
  databaseId: DatabaseId;

  createTableList: CreateTableContext[];
  alterTableList: AlterTableContext[];
  renameTableList: RenameTableContext[];
  dropTableList: DropTableContext[];
}

export interface CreateTableContext {
  name: string;
  type: string;
  engine: string;
  characterSet: string;
  collation: string;
  comment: string;

  addColumnList: AddColumnContext[];
}

export interface AlterTableContext {
  name: string;

  addColumnList: AddColumnContext[];
  changeColumnList: ChangeColumnContext[];
  dropColumnList: DropColumnContext[];
}

export interface RenameTableContext {
  oldName: string;
  newName: string;
}

export interface DropTableContext {
  name: string;
}

export interface AddColumnContext {
  name: string;
  type: string;
  characterSet: string;
  collation: string;
  comment: string;
  nullable: boolean;
  default?: string;
}

export interface ChangeColumnContext {
  oldName: string;
  newName: string;
  type: string;
  characterSet: string;
  collation: string;
  comment: string;
  nullable: boolean;
  default?: string;
}

export interface DropColumnContext {
  name: string;
}
