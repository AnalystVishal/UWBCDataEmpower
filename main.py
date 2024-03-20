from googleapiclient.discovery import build

def trigger_df_job(cloud_event, environment):

	service = build('dataflow', 'v1b3')
	project = "rich-boulevard-417017"
	
	template_path = "gs://dataflow-templates-us-central1/latest/GCS_Text_to_BigQuery"
	
	#Replace your parameters in "parameters" section from your data pipeline
  template_body = {
		"jobName": "gcs-to-bq-auto-load", 
		"parameters": {
			"inputFilePattern": "gs://uwbc_files/UWBC - Survey for Menstrual Products Demand (Responses) - Form Responses 1.csv",
			"JSONPath": "gs://uwbc_metadata/bq.json",
			"outputTable": "rich-boulevard-417017:UwbcDataWarehouse.Uwbc_Survey",
			"bigQueryLoadingTemporaryDirectory": "gs://uwbc_metadata",
			"javascriptTextTransformGcsPath": "gs://uwbc_metadata/udf.js",
			"javascriptTextTransformFunctionName": "transform"
		}
	}
	
	request = service.projects().templates().launch(projectId=project, gcsPath=template_path, body=template_body)
	response = request.execute()
	print(response)
