// For now the ADMIN requires the same database privilege as RW.
// The seperation is to make it explicit which one serves as the ADMIN data source,

import { Database } from "./database";
import {
  DatabaseId,
  DataSourceId,
  InstanceId,
  IssueId,
  PrincipalId,
} from "./id";
import { Instance } from "./instance";
import { Principal } from "./principal";

// which from the ops perspective, having different meaning from the normal RW data source.
export type DataSourceType = "ADMIN" | "RW" | "RO";

export type DataSource = {
  id: DataSourceId;

  // Related fields
  database: Database;
  instance: Instance;
  // Returns the member list directly because we need it quite frequently in order
  // to do various access check.
  memberList: DataSourceMember[];

  // Standard fields
  creator: Principal;
  createdTs: number;
  updater: Principal;
  updatedTs: number;

  // Domain specific fields
  name: string;
  type: DataSourceType;
  // In mysql, username can be empty which means anonymous user
  username?: string;
  password?: string;
};

export type DataSourceCreate = {
  // Related fields
  databaseId: DatabaseId;
  instanceId: InstanceId;
  memberList: DataSourceMemberCreate[];

  // Standard fields
  creatorId: PrincipalId;

  // Domain specific fields
  name: string;
  type: DataSourceType;
  username?: string;
  password?: string;
};

export type DataSourcePatch = {
  // Domain specific fields
  name?: string;
  username?: string;
  password?: string;
};

export type DataSourceMember = {
  // Standard fields
  createdTs: number;

  // Domain specific fields
  principal: Principal;
  issueId?: IssueId;
};

export type DataSourceMemberCreate = {
  // Domain specific fields
  principalId: PrincipalId;
  issueId?: IssueId;
};
