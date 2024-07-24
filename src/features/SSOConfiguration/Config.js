export const ssoConfigData = {
  title: "SSO CONFIGURATIONS",
  subTitle: "FILTER",
  addSso: "Create New SSO Configuration",
  authenticationProtocolTypes: [
    { value: "WS-Federation", label: "WS-Federation" },
    { value: "OAuth2", label: "OAuth2" },
    { value: "OpenId Connect", label: "OpenId" },
  ],
  positiveBtnText: "Apply",
  negativeBtnText: "Cancel",
  tableHeaders: ["Configuration Name", "District(s)", "Protocol"],
  protocolObj: {
    "WS-Federation": {
      authorization_protocol: "",
      configuration_name: "",
      district_uuid: "",

      authentication_type: "",
      caption: "",
      metadata_url: "",
      callback_url: "",
      app_id_url: "",
      user_id_property: "",
      fitness_gram_sso_field: "",
      created_by: "",
    },

    OAuth2: {
      authorization_protocol: "",
      configuration_name: "",
      district_uuid: "",

      discovery_url: "",
      issuer: "",

      authorization_url: "",
      token_url: "",
      user_info_url: "",

      user_info_http_type: "",
      user_info_response_type: "",
      user_id_property: "",
      fitness_gram_sso_field: "",

      district_id_property: "",
      Json_web_key_set_url: "",

      url_path: "",
      client_id: "",

      client_secret: "",
      response_type: "",

      response_mode: "",
      scope: "",

      enable_state: false,
      enable_nonce: false,

      // authentication_type: "",
      created_by: "",
    },

    "OpenId Connect": {
      authorization_protocol: "",
      configuration_name: "",
      district_uuid: "",

      discovery_url: "",
      issuer: "",

      authorization_url: "",
      token_url: "",
      user_info_url: "",

      user_info_http_type: "",
      user_info_response_type: "",
      user_id_property: "",
      fitness_gram_sso_field: "",

      district_id_property: "",
      Json_web_key_set_url: "",

      url_path: "",
      client_id: "",

      client_secret: "",
      response_type: "",

      response_mode: "",
      scope: "",

      enable_state: false,
      enable_nonce: false,

      created_by: "",
    },
  },
};


export const wsFederationList = [
  {
    id: 1,
    Id: "wsFedAuthenticationType",
    name: "authentication_type",
    label: "Authentication Type:",
    inputType: "text",
  },

  {
    id: 2,
    Id: "wsFedCaption",
    name: "caption",
    label: "Caption:",
    inputType: "text",
  },

  {
    id: 3,
    Id: "wsFedMetadatUrl",
    name: "metadata_url",
    label: "Metadata URL:",
    inputType: "text",
  },

  {
    id: 4,
    Id: "wsFedCallbackUrl",
    name: "callback_url",
    label: "Callback URL:",
    inputType: "text",
  },

  {
    id: 5,
    Id: "wsFedAppIdUrl",
    name: "app_id_url",
    label: "Relying party Trust Identifier / App ID URL:",
    inputType: "text",
  },

  {
    id: 6,
    Id: "wsFedUserProperty",
    name: "user_id_property",
    label: "User ID Property:",
    inputType: "text",
  },

  {
    id: 7,
    Id: "wsFedFitnessgramSsoField",
    name: "fitness_gram_sso_field",
    label: "Fitness Gram SSO Field:",
    inputType: "Select",
    optionsList: [
      {
        id: "1",
        label: "Email",
        value: "email",
      },

      {
        id: "2",
        label: "Username",
        value: "user_name",
      },

      {
        id: "3",
        label: "Local Identifier",
        value: "local_identifier",
      },

      {
        id: "4",
        label: "SSO ID",
        value: "sso_id",
      },
    ],
  },
];
export const oAuth2List = [
  {
    id: 1,
    Id: "oAuth2DiscoveryUrl",
    name: "discovery_url",
    label: "Discovery URL:",
    inputType: "text",
  },

  {
    id: 2,
    Id: "oAuth2Issuer",
    name: "issuer",
    label: "Issuer:",
    inputType: "text",
  },

  {
    id: 3,
    Id: "oAuth2AuthorizationUrl",
    name: "authorization_url",
    label: "Authorization URL*:",
    inputType: "text",
  },

  {
    id: 4,
    Id: "oAuth2TokenUrl",
    name: "token_url",
    label: "Token URL:",
    inputType: "text",
  },

  {
    id: 5,
    Id: "oAuth2UserInfoUrl",
    name: "user_info_url",
    label: "User info URL:",
    inputType: "text",
  },

  {
    id: 6,
    Id: "oAuth2UserInfoHttpType",
    name: "user_info_http_type",
    label: "User Info HTTP Type:",
    inputType: "Select",
    optionsList: [
      {
        id: "1",
        Id: "oAuth2UserInfoHttpType",
        label: "Get",
        value: "get",
      },

      {
        id: "2",
        Id: "oAuth2UserInfoHttpType",
        label: "Post",
        value: "post",
      },
    ],
  },

  {
    id: 7,
    name: "user_info_response_type",
    label: "User Info Response Type:",
    inputType: "Select",
    Id:'oAuth2UserInfoResponseType',
    optionsList: [
      {
        id: "1",
        label: "Claims",
        value: "claims",
      },

      {
        id: "2",
        label: "JSON",
        value: "json",
      },
    ],
  },

  {
    id: 8,
    Id:'oAuth2UserIdProperty',
    name: "user_id_property",
    label: "User ID Property:",
    inputType: "text",
  },

  {
    id: 9,
    Id: "oAuth2FitnessgramSsoField",
    name: "fitness_gram_sso_field",
    label: "FitnessGram SSO Field:",
    inputType: "Select",
    optionsList: [
      {
        id: "1",
        label: "Email",
        value: "email",
      },

      {
        id: "2",
        label: "Username",
        value: "user_name",
      },

      {
        id: "3",
        label: "Local Identifier",
        value: "local_identifier",
      },

      {
        id: "4",
        label: "SSO ID",
        value: "sso_id",
      },
    ],
  },

  {
    id: 10,
    Id:'oAuth2DistrictIdProperty',
    name: "district_id_property",
    label: "District ID Field:",
    inputType: "text",
  },

  {
    id: 11,
    Id:'oAuth2JsonWebKeySetUrl',
    name: "Json_web_key_set_url",
    label: "JSON Web Key Set URL:",
    inputType: "text",
  },

  {
    id: 12,
    Id:'oAuth2UrlPath',
    name: "url_path",
    label: "URL Path:",
    inputType: "text",
  },

  {
    id: 13,
    Id:'oAuth2ClientId',
    name: "client_id",
    label: "Client ID:",
    inputType: "text",
  },

  {
    id: 14,
    Id:'oAuth2ClientSecret',
    name: "client_secret",
    label: "Client Secret:",
    inputType: "text",
  },

  {
    id: 15,
    Id:'oAuth2ResponseType',
    name: "response_type",
    label: "Response Type:",
    inputType: "Select",
    optionsList: [
      {
        id: "1",
        label: "Code",
        value: "code",
      },
    ],
  },

  {
    id: 16,
    Id:'oAuth2ResponseMode',
    name: "response_mode",
    label: "Response Mode:",
    inputType: "Select",
    optionsList: [
      {
        id: "1",
        label: "Default",
        value: "default",
      },
    ],
  },

  {
    id: 17,
    Id:'oAuth2Scope',
    name: "scope",
    label: "Scope:",
    inputType: "text",
  },
];


export const openIdConnectList = [
  {
    id: 1,
    Id:'openIdDiscoveryUrl',
    name: "discovery_url",
    label: "Discovery URL:",
    inputType: "text",
  },

  {
    id: 2,
    Id:'openIdIssuer',
    name: "issuer",
    label: "Issuer:",
    inputType: "text",
  },

  {
    id: 3,
    Id:'openIdAuthorizationUrl',
    name: "authorization_url",
    label: "Authorization URL*:",
    inputType: "text",
  },

  {
    id: 4,
    Id:'openIdTokenUrl',
    name: "token_url",
    label: "Token URL:",
    inputType: "text",
  },

  {
    id: 5,
    Id:'openIdUserInfoUrl',
    name: "user_info_url",
    label: "User info URL:",
    inputType: "text",
  },

  {
    id: 6,
    Id:'openIdUserInfoHttpType',
    name: "user_info_http_type",
    label: "User Info HTTP Type:",
    inputType: "Select",
    optionsList: [
      {
        id: "1",
        label: "Get",
        value: "get",
      },

      {
        id: "2",
        label: "Post",
        value: "post",
      },
    ],
  },

  {
    id: 7,
    Id:'openIdUserInfoResponseType',
    name: "user_info_response_type",
    label: "User Info Response Type:",
    inputType: "Select",
    optionsList: [
      {
        id: "1",
        label: "Claims",
        value: "claims",
      },

      {
        id: "2",
        label: "JSON",
        value: "json",
      },
    ],
  },

  {
    id: 8,
    Id:'openIdUserIdProperty',
    name: "user_id_property",
    label: "User ID Property:",
    inputType: "text",
  },

  {
    id: 9,
    Id: "openIdFitnessgramSsoField",
    name: "fitness_gram_sso_field",
    label: "FitnessGram SSO Field:",
    inputType: "Select",
    optionsList: [
      {
        id: "1",
        label: "Email",
        value: "email",
      },

      {
        id: "2",
        label: "Username",
        value: "user_name",
      },

      {
        id: "3",
        label: "Local Identifier",
        value: "local_identifier",
      },

      {
        id: "4",
        label: "SSO ID",
        value: "sso_id",
      },
    ],
  },

  {
    id: 10,
    Id:'openIdDistrictIdProperty',
    name: "district_id_property",
    label: "District ID Field:",

    inputType: "text",
  },

  {
    id: 11,
    Id:'openIdJsonWebKeySetUrl',
    name: "Json_web_key_set_url",
    label: "JSON Web Key Set URL:",
    inputType: "text",
  },

  {
    id: 12,
    Id:'openIdUrlPath',
    name: "url_path",
    label: "URL Path:",
    inputType: "text",
  },

  {
    id: 13,
    Id:'openIdClientId',
    name: "client_id",
    label: "Client ID:",
    inputType: "text",
  },

  {
    id: 14,
    Id:'openIdClientSecret',
    name: "client_secret",
    label: "Client Secret:",
    inputType: "text",
  },

  {
    id: 15,
    Id:'openIdResponseType',
    name: "response_type",
    label: "Response Type:",
    inputType: "Select",
    optionsList: [
      {
        id: "1",
        label: "Code",
        value: "code",
      },

      {
        id: "2",
        label: "ID Token",
        value: "id_token",
      },
    ],
  },

  {
    id: 16,
    Id:'openIdResponseMode',
    name: "response_mode",
    label: "Response Mode:",
    inputType: "Select",
    optionsList: [
      {
        id: "1",
        label: "Default",
        value: "default",
      },
    ],
  },

  {
    id: 17,
    Id:'openIdScope',
    name: "scope",
    label: "Scope:",
    inputType: "text",
  },
];