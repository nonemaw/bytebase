// Package api provides the API definition for enterprise service.
package api

import (
	"strings"
	"time"

	"github.com/pkg/errors"

	"github.com/bytebase/bytebase/api"
)

// validPlans is a string array of valid plan types.
var validPlans = []api.PlanType{
	api.TEAM,
	api.ENTERPRISE,
}

// License is the API message for enterprise license.
type License struct {
	Subject       string       `json:"subject"`
	InstanceCount int          `json:"instanceCount"`
	ExpiresTs     int64        `json:"expiresTs"`
	IssuedTs      int64        `json:"issuedTs"`
	Plan          api.PlanType `json:"plan"`
	Trialing      bool         `json:"trialing"`
	OrgName       string       `json:"orgName"`
}

// Valid will check if license expired or has correct plan type.
func (l *License) Valid() error {
	if expireTime := time.Unix(l.ExpiresTs, 0); expireTime.Before(time.Now()) {
		return errors.Errorf("license has expired at %v", expireTime)
	}

	return l.validPlanType()
}

func (l *License) validPlanType() error {
	for _, plan := range validPlans {
		if plan == l.Plan {
			return nil
		}
	}

	return errors.Errorf("plan %q is not valid, expect %s or %s",
		l.Plan.String(),
		api.TEAM.String(),
		api.ENTERPRISE.String(),
	)
}

// OrgID extract the organization id from license subject.
func (l *License) OrgID() string {
	return strings.Split(l.Subject, ".")[0]
}

// LicenseService is the service for enterprise license.
type LicenseService interface {
	// StoreLicense will store license into file.
	StoreLicense(patch *SubscriptionPatch) error
	// LoadLicense will load license from file and validate it.
	LoadLicense() (*License, error)
}
