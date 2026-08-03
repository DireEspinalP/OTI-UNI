/* ¿QUE ES SQL SERVER?
SQL (Structured Query Language) es el lenguaje estándar 
para trabajar con bases de datos relacionales. Permite crear, consultar, modificar y
administrar la información almacenada en una base de datos.

En otras palabras, SQL es el idioma con el que nos comunicamos con sistemas gestores de bases de datos como SQL Server, Oracle, MySQL, PostgreSQL y otros

¿Qué es SQL Server?
SQL Server 2025 es la próxima gran versión del sistema de gestión de bases de datos relacionales (RDBMS) de Microsoft. Diseñado para suceder a SQL Server 2022, esta versión está fuertemente enfocada en la inteligencia artificial (IA), la integración híbrida con la nube y la modernización de aplicaciones.

Actualmente, SQL Server 2025 se encuentra en fase de vista previa (Preview / CTP) y su lanzamiento oficial está programado para el transcurso del año 2025.

A continuación, se detallan las características y novedades más importantes de SQL Server 2025:

1. Inteligencia Artificial Nativa (El gran salto)
La principal novedad de SQL Server 2025 es su preparación para la era de la IA generativa:

Soporte de Vectores (Vector Support): Permite almacenar y consultar "embeddings" vectoriales directamente en la base de datos. Esto es fundamental para construir aplicaciones de IA de búsqueda semántica y sistemas de generación aumentada por recuperación (RAG), utilizando modelos de lenguaje (LLMs) como GPT-4 de OpenAI.
Búsqueda Vectorial Integrada: SQL Server 2025 introduce funciones para realizar búsquedas de similitud (como la distancia coseno) de forma nativa y eficiente.
Integración con Azure AI: Facilita la conexión directa desde la base de datos a servicios de Azure AI para realizar traducción de textos, análisis de sentimientos o generación de contenido sin tener que extraer los datos.
2. Copilot para SQL Server
Microsoft ha integrado su asistente de IA, Copilot, para ayudar a los administradores de bases de datos (DBAs) y desarrolladores:

Ayuda a escribir, optimizar y depurar consultas SQL complejas.
Asiste en la administración del servidor y la resolución de problemas de rendimiento (troubleshooting) mediante lenguaje natural.
3. Integración con Microsoft Fabric y Azure Arc
Microsoft continúa su estrategia de "nube híbrida":

Fabric Mirroring: Permite replicar datos de SQL Server en tiempo real hacia Microsoft Fabric (el almacén de datos analíticos en la nube de Microsoft) sin necesidad de procesos complejos de ETL (Extracción, Transformación y Carga).
Gestión mejorada con Azure Arc: Facilita la administración de instancias de SQL Server instaladas localmente (On-Premises) desde el portal de Azure, mejorando la seguridad, la gobernanza y las actualizaciones automáticas.
4. Rendimiento y Escalabilidad Inteligente
Como en cada versión, el motor de base de datos recibe mejoras de rendimiento automático:

Procesamiento de Consultas Inteligente (Intelligent Query Processing - IQP): SQL Server aprende del comportamiento de las consultas previas para optimizar las siguientes de forma automática, reduciendo el consumo de CPU y memoria.
Optimización para hardware moderno: Mejor aprovechamiento de las nuevas arquitecturas de procesadores y sistemas de almacenamiento ultra rápidos.
5. Seguridad Avanzada
Mejoras en Always Encrypted (encriptación de datos en tránsito, en reposo y en memoria).
Evolución de SQL Ledger, la tecnología basada en blockchain de Microsoft que permite crear tablas inmutables para auditorías financieras y de seguridad, evitando la alteración de registros históricos.
¿A quién está dirigido?
Empresas con infraestructura local (On-Premises): Que necesitan mantener sus datos en servidores propios por regulación o latencia, pero quieren usar herramientas de IA moderna.
Desarrolladores de aplicaciones de IA: Que buscan una base de datos robusta, segura y empresarial que soporte datos vectoriales.
Administradores de TI (DBAs): Que buscan automatizar tareas de mantenimiento y optimización mediante el uso de inteligencia artificial.

*/