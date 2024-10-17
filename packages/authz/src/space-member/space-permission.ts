import type { ISpaceAction } from "./space-action"
import type { ISpaceMemberRole } from "./space-member"

export const spacePermission: Record<ISpaceMemberRole, Record<ISpaceAction, boolean>> = {
  owner: {
    "space:list": true,
    "space:read": true,
    "space:update": true,
    "space:delete": true,

    "base:create": true,
    "base:list": true,
    "base:delete": true,
    "base:read": true,
    "base:update": true,

    "view:create": true,
    "view:update": true,
    "view:read": true,
    "view:list": true,
    "view:delete": true,

    "table:create": true,
    "table:update": true,
    "table:list": true,
    "table:delete": true,
    "table:read": true,

    "dashboard:create": true,
    "dashboard:update": true,
    "dashboard:list": true,
    "dashboard:delete": true,
    "dashboard:read": true,

    "form:create": true,
    "form:update": true,
    "form:list": true,
    "form:delete": true,
    "form:read": true,

    "field:create": true,
    "field:update": true,
    "field:delete": true,

    "record:create": true,
    "record:list": true,
    "record:delete": true,
    "record:read": true,
    "record:update": true,
    "record:download": true,

    "webhook:create": true,
    "webhook:update": true,
    "webhook:delete": true,
    "webhook:list": true,

    "share:disable": true,
    "share:view": true,
    "share:table": true,
    "share:base": true,
    "share:form": true,
    "share:dashboard": true,

    "authz:invite": true,
    "authz:listInvitation": true,
    "authz:deleteInvitation": true,
  },
  admin: {
    "space:list": true,
    "space:read": true,
    "space:update": false,
    "space:delete": false,

    "base:create": true,
    "base:list": true,
    "base:delete": true,
    "base:read": true,
    "base:update": true,

    "table:create": true,
    "table:update": true,
    "table:list": true,
    "table:delete": true,
    "table:read": true,

    "dashboard:create": true,
    "dashboard:update": true,
    "dashboard:list": true,
    "dashboard:delete": true,
    "dashboard:read": true,

    "view:create": true,
    "view:update": true,
    "view:read": true,
    "view:list": true,
    "view:delete": true,

    "form:create": true,
    "form:update": true,
    "form:list": true,
    "form:delete": true,
    "form:read": true,

    "field:create": true,
    "field:update": true,
    "field:delete": true,

    "record:create": true,
    "record:list": true,
    "record:delete": true,
    "record:read": true,
    "record:update": true,
    "record:download": true,

    "webhook:create": true,
    "webhook:update": true,
    "webhook:delete": true,
    "webhook:list": true,

    "share:disable": true,
    "share:view": true,
    "share:table": true,
    "share:base": true,
    "share:form": true,
    "share:dashboard": true,

    "authz:invite": true,
    "authz:listInvitation": true,
    "authz:deleteInvitation": true,
  },
  editor: {
    "space:list": true,
    "space:read": true,
    "space:update": false,
    "space:delete": false,

    "base:create": true,
    "base:list": true,
    "base:delete": false,
    "base:read": true,
    "base:update": true,

    "dashboard:create": true,
    "dashboard:update": true,
    "dashboard:list": true,
    "dashboard:delete": false,
    "dashboard:read": true,

    "form:create": true,
    "form:update": true,
    "form:list": true,
    "form:delete": true,
    "form:read": true,

    "view:create": false,
    "view:update": false,
    "view:read": true,
    "view:list": true,
    "view:delete": false,

    "table:create": true,
    "table:update": true,
    "table:list": true,
    "table:delete": false,
    "table:read": true,

    "field:create": false,
    "field:update": false,
    "field:delete": false,

    "record:create": true,
    "record:list": true,
    "record:delete": true,
    "record:read": true,
    "record:update": true,
    "record:download": true,

    "share:disable": true,
    "share:view": false,
    "share:table": false,
    "share:base": false,
    "share:form": true,
    "share:dashboard": false,

    "webhook:create": true,
    "webhook:update": true,
    "webhook:delete": false,
    "webhook:list": true,

    "authz:invite": true,
    "authz:listInvitation": true,
    "authz:deleteInvitation": false,
  },
  viewer: {
    "space:list": true,
    "space:read": true,
    "space:update": false,
    "space:delete": false,

    "base:create": false,
    "base:list": true,
    "base:delete": false,
    "base:read": true,
    "base:update": false,

    "table:create": false,
    "table:update": false,
    "table:list": true,
    "table:delete": false,
    "table:read": true,

    "dashboard:create": false,
    "dashboard:update": false,
    "dashboard:list": true,
    "dashboard:delete": false,
    "dashboard:read": true,

    "view:create": false,
    "view:update": false,
    "view:read": true,
    "view:list": true,
    "view:delete": false,

    "form:create": false,
    "form:update": false,
    "form:list": true,
    "form:delete": false,
    "form:read": true,

    "field:create": false,
    "field:update": false,
    "field:delete": false,

    "record:create": false,
    "record:list": true,
    "record:delete": false,
    "record:read": true,
    "record:update": false,
    "record:download": false,

    "webhook:create": false,
    "webhook:update": false,
    "webhook:delete": false,
    "webhook:list": true,

    "share:disable": false,
    "share:view": false,
    "share:table": false,
    "share:base": false,
    "share:form": false,
    "share:dashboard": false,

    "authz:invite": true,
    "authz:listInvitation": true,
    "authz:deleteInvitation": false,
  },
}
