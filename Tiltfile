docker_build(
    'localhost:35547/spring-app',
    context='./backend',
    live_update=[
        sync('./backend', '/app'),
    ]
)

docker_build(
    'localhost:35548/next-app',
    context='./frontend',
    live_update=[
        sync('./frontend', '/app'),
    ]
)

k8s_yaml(
    [
        'infra/backend-secrets.yaml',
        'infra/service.yaml',
        'infra/backend-deployment.yaml',
        'infra/postgres.yaml',
        'infra/rabbitmq.yaml',
        'infra/redis.yaml',
        'infra/frontend-deployment.yaml',
    ],
)

k8s_resource(
    'spring-app',
    port_forwards=['8080:8080'],
    labels=["application"]
)

k8s_resource(
    'next-app',
    port_forwards=['3000:3000'],
    labels=["application"]
)
