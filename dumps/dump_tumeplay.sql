--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3 (Ubuntu 13.3-0ubuntu0.21.04.1)
-- Dumped by pg_dump version 13.3 (Ubuntu 13.3-0ubuntu0.21.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: AnswerTexts; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public."AnswerTexts" (
    id integer NOT NULL,
    "ResponseOui" character varying(255),
    "ReponseNon" character varying(255),
    "ReponseAutre" character varying(255),
    response_yes character varying(255),
    response_no character varying(255),
    response_unknow character varying(255),
    "response_A" character varying(255),
    "response_B" character varying(255),
    "response_C" character varying(255),
    "response_A_neutral" boolean,
    "response_B_neutral" boolean,
    "response_C_neutral" boolean
);


ALTER TABLE public."AnswerTexts" OWNER TO db_user;

--
-- Name: AnswerTexts_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public."AnswerTexts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."AnswerTexts_id_seq" OWNER TO db_user;

--
-- Name: AnswerTexts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public."AnswerTexts_id_seq" OWNED BY public."AnswerTexts".id;


--
-- Name: Feedback; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public."Feedback" (
    id integer NOT NULL,
    "Title" character varying(255),
    created_by integer,
    updated_by integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    title character varying(255),
    question_id integer,
    question integer,
    body text,
    "isLiked" boolean,
    "isDisliked" boolean,
    appreciation integer NOT NULL
);


ALTER TABLE public."Feedback" OWNER TO db_user;

--
-- Name: Feedback_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public."Feedback_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Feedback_id_seq" OWNER TO db_user;

--
-- Name: Feedback_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public."Feedback_id_seq" OWNED BY public."Feedback".id;


--
-- Name: answer; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.answer (
    id integer NOT NULL,
    text character varying(255),
    "isCorrect" boolean,
    "isNeutral" boolean,
    published_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.answer OWNER TO db_user;

--
-- Name: answer_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.answer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.answer_id_seq OWNER TO db_user;

--
-- Name: answer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.answer_id_seq OWNED BY public.answer.id;


--
-- Name: box; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.box (
    id integer NOT NULL,
    title character varying(255),
    published_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    stock bigint,
    zone integer,
    environnement integer,
    description text,
    available boolean,
    number integer
);


ALTER TABLE public.box OWNER TO db_user;

--
-- Name: box-dynamic; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public."box-dynamic" (
    id integer NOT NULL,
    title character varying(255),
    description text,
    published_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."box-dynamic" OWNER TO db_user;

--
-- Name: box-dynamic_components; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public."box-dynamic_components" (
    id integer NOT NULL,
    field character varying(255) NOT NULL,
    "order" integer NOT NULL,
    component_type character varying(255) NOT NULL,
    component_id integer NOT NULL,
    "box-dynamic_id" integer NOT NULL
);


ALTER TABLE public."box-dynamic_components" OWNER TO db_user;

--
-- Name: box-dynamic_components_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public."box-dynamic_components_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."box-dynamic_components_id_seq" OWNER TO db_user;

--
-- Name: box-dynamic_components_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public."box-dynamic_components_id_seq" OWNED BY public."box-dynamic_components".id;


--
-- Name: box-dynamic_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public."box-dynamic_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."box-dynamic_id_seq" OWNER TO db_user;

--
-- Name: box-dynamic_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public."box-dynamic_id_seq" OWNED BY public."box-dynamic".id;


--
-- Name: box_components; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.box_components (
    id integer NOT NULL,
    field character varying(255) NOT NULL,
    "order" integer NOT NULL,
    component_type character varying(255) NOT NULL,
    component_id integer NOT NULL,
    box_id integer NOT NULL
);


ALTER TABLE public.box_components OWNER TO db_user;

--
-- Name: box_components_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.box_components_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.box_components_id_seq OWNER TO db_user;

--
-- Name: box_components_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.box_components_id_seq OWNED BY public.box_components.id;


--
-- Name: box_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.box_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.box_id_seq OWNER TO db_user;

--
-- Name: box_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.box_id_seq OWNED BY public.box.id;


--
-- Name: components_commandes_box_sur_mesure_produits; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.components_commandes_box_sur_mesure_produits (
    id integer NOT NULL,
    produit integer,
    quantity integer
);


ALTER TABLE public.components_commandes_box_sur_mesure_produits OWNER TO db_user;

--
-- Name: components_commandes_box_sur_mesure_produits_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.components_commandes_box_sur_mesure_produits_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.components_commandes_box_sur_mesure_produits_id_seq OWNER TO db_user;

--
-- Name: components_commandes_box_sur_mesure_produits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.components_commandes_box_sur_mesure_produits_id_seq OWNED BY public.components_commandes_box_sur_mesure_produits.id;


--
-- Name: components_commandes_box_sur_mesures; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.components_commandes_box_sur_mesures (
    id integer NOT NULL
);


ALTER TABLE public.components_commandes_box_sur_mesures OWNER TO db_user;

--
-- Name: components_commandes_box_sur_mesures_components; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.components_commandes_box_sur_mesures_components (
    id integer NOT NULL,
    field character varying(255) NOT NULL,
    "order" integer NOT NULL,
    component_type character varying(255) NOT NULL,
    component_id integer NOT NULL,
    components_commandes_box_sur_mesure_id integer NOT NULL
);


ALTER TABLE public.components_commandes_box_sur_mesures_components OWNER TO db_user;

--
-- Name: components_commandes_box_sur_mesures_components_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.components_commandes_box_sur_mesures_components_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.components_commandes_box_sur_mesures_components_id_seq OWNER TO db_user;

--
-- Name: components_commandes_box_sur_mesures_components_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.components_commandes_box_sur_mesures_components_id_seq OWNED BY public.components_commandes_box_sur_mesures_components.id;


--
-- Name: components_commandes_box_sur_mesures_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.components_commandes_box_sur_mesures_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.components_commandes_box_sur_mesures_id_seq OWNER TO db_user;

--
-- Name: components_commandes_box_sur_mesures_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.components_commandes_box_sur_mesures_id_seq OWNED BY public.components_commandes_box_sur_mesures.id;


--
-- Name: components_commandes_boxes; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.components_commandes_boxes (
    id integer NOT NULL,
    box integer
);


ALTER TABLE public.components_commandes_boxes OWNER TO db_user;

--
-- Name: components_commandes_boxes_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.components_commandes_boxes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.components_commandes_boxes_id_seq OWNER TO db_user;

--
-- Name: components_commandes_boxes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.components_commandes_boxes_id_seq OWNED BY public.components_commandes_boxes.id;


--
-- Name: components_referents_opening_hours; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.components_referents_opening_hours (
    id integer NOT NULL,
    hours character varying(255),
    monday_title character varying(255),
    monday_value character varying(255),
    tuesday_title character varying(255),
    tuesday_value character varying(255),
    wednesday_title character varying(255),
    wednesday_value character varying(255),
    thursday_title character varying(255),
    thursday_value character varying(255),
    friday_title character varying(255),
    friday_value character varying(255),
    saturday_title character varying(255),
    saturday_value character varying(255),
    sunday_title character varying(255),
    sunday_value character varying(255)
);


ALTER TABLE public.components_referents_opening_hours OWNER TO db_user;

--
-- Name: components_referents_opening_hours_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.components_referents_opening_hours_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.components_referents_opening_hours_id_seq OWNER TO db_user;

--
-- Name: components_referents_opening_hours_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.components_referents_opening_hours_id_seq OWNED BY public.components_referents_opening_hours.id;


--
-- Name: components_referents_openings; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.components_referents_openings (
    id integer NOT NULL,
    monday_title character varying(255),
    monday_value character varying(255)
);


ALTER TABLE public.components_referents_openings OWNER TO db_user;

--
-- Name: components_referents_openings_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.components_referents_openings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.components_referents_openings_id_seq OWNER TO db_user;

--
-- Name: components_referents_openings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.components_referents_openings_id_seq OWNED BY public.components_referents_openings.id;


--
-- Name: components_referents_time_tables; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.components_referents_time_tables (
    id integer NOT NULL,
    day character varying(255)
);


ALTER TABLE public.components_referents_time_tables OWNER TO db_user;

--
-- Name: components_referents_time_tables_components; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.components_referents_time_tables_components (
    id integer NOT NULL,
    field character varying(255) NOT NULL,
    "order" integer NOT NULL,
    component_type character varying(255) NOT NULL,
    component_id integer NOT NULL,
    components_referents_time_table_id integer NOT NULL
);


ALTER TABLE public.components_referents_time_tables_components OWNER TO db_user;

--
-- Name: components_referents_time_tables_components_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.components_referents_time_tables_components_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.components_referents_time_tables_components_id_seq OWNER TO db_user;

--
-- Name: components_referents_time_tables_components_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.components_referents_time_tables_components_id_seq OWNED BY public.components_referents_time_tables_components.id;


--
-- Name: components_referents_time_tables_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.components_referents_time_tables_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.components_referents_time_tables_id_seq OWNER TO db_user;

--
-- Name: components_referents_time_tables_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.components_referents_time_tables_id_seq OWNED BY public.components_referents_time_tables.id;


--
-- Name: components_stocks_box_produit_sur_mesures; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.components_stocks_box_produit_sur_mesures (
    id integer NOT NULL,
    stock bigint,
    produit integer
);


ALTER TABLE public.components_stocks_box_produit_sur_mesures OWNER TO db_user;

--
-- Name: components_stocks_box_produit_sur_mesures_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.components_stocks_box_produit_sur_mesures_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.components_stocks_box_produit_sur_mesures_id_seq OWNER TO db_user;

--
-- Name: components_stocks_box_produit_sur_mesures_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.components_stocks_box_produit_sur_mesures_id_seq OWNED BY public.components_stocks_box_produit_sur_mesures.id;


--
-- Name: components_stocks_box_produits; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.components_stocks_box_produits (
    id integer NOT NULL,
    quantity integer,
    produit integer
);


ALTER TABLE public.components_stocks_box_produits OWNER TO db_user;

--
-- Name: components_stocks_box_produits_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.components_stocks_box_produits_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.components_stocks_box_produits_id_seq OWNER TO db_user;

--
-- Name: components_stocks_box_produits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.components_stocks_box_produits_id_seq OWNED BY public.components_stocks_box_produits.id;


--
-- Name: contact; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.contact (
    id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    created_by integer,
    updated_by integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    zipcode integer,
    box integer,
    zone integer,
    type character varying(255)
);


ALTER TABLE public.contact OWNER TO db_user;

--
-- Name: contact_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.contact_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contact_id_seq OWNER TO db_user;

--
-- Name: contact_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.contact_id_seq OWNED BY public.contact.id;


--
-- Name: contents; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.contents (
    id integer NOT NULL,
    title character varying(255),
    text text,
    link character varying(255),
    comment character varying(255),
    "thematiqueId" integer,
    published_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    theme integer
);


ALTER TABLE public.contents OWNER TO db_user;

--
-- Name: contents_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.contents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contents_id_seq OWNER TO db_user;

--
-- Name: contents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.contents_id_seq OWNED BY public.contents.id;


--
-- Name: core_store; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.core_store (
    id integer NOT NULL,
    key character varying(255),
    value text,
    type character varying(255),
    environment character varying(255),
    tag character varying(255)
);


ALTER TABLE public.core_store OWNER TO db_user;

--
-- Name: core_store_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.core_store_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_store_id_seq OWNER TO db_user;

--
-- Name: core_store_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.core_store_id_seq OWNED BY public.core_store.id;


--
-- Name: environnements; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.environnements (
    id integer NOT NULL,
    title character varying(255),
    slug character varying(255),
    thematique integer,
    created_by integer,
    updated_by integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    role integer,
    "user" integer,
    name character varying(255)
);


ALTER TABLE public.environnements OWNER TO db_user;

--
-- Name: environnements_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.environnements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.environnements_id_seq OWNER TO db_user;

--
-- Name: environnements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.environnements_id_seq OWNED BY public.environnements.id;


--
-- Name: i18n_locales; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.i18n_locales (
    id integer NOT NULL,
    name character varying(255),
    code character varying(255),
    created_by integer,
    updated_by integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.i18n_locales OWNER TO db_user;

--
-- Name: i18n_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.i18n_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.i18n_locales_id_seq OWNER TO db_user;

--
-- Name: i18n_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.i18n_locales_id_seq OWNED BY public.i18n_locales.id;


--
-- Name: order; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public."order" (
    id integer NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    email character varying(255),
    delivery character varying(255),
    created_by integer,
    updated_by integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    address character varying(255) NOT NULL,
    address_deptcode character varying(255),
    address_dept character varying(255),
    address_region character varying(255),
    address_zipcode character varying(255),
    poi_name character varying(255),
    name character varying(255),
    phone character varying(255),
    address_city character varying(255),
    address_more character varying(255),
    poi_number character varying(255),
    referent integer,
    sent boolean
);


ALTER TABLE public."order" OWNER TO db_user;

--
-- Name: order_components; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.order_components (
    id integer NOT NULL,
    field character varying(255) NOT NULL,
    "order" integer NOT NULL,
    component_type character varying(255) NOT NULL,
    component_id integer NOT NULL,
    order_id integer NOT NULL
);


ALTER TABLE public.order_components OWNER TO db_user;

--
-- Name: order_components_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.order_components_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_components_id_seq OWNER TO db_user;

--
-- Name: order_components_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.order_components_id_seq OWNED BY public.order_components.id;


--
-- Name: order_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_id_seq OWNER TO db_user;

--
-- Name: order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.order_id_seq OWNED BY public."order".id;


--
-- Name: produits; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.produits (
    id integer NOT NULL,
    title character varying(255),
    description text,
    quantity bigint,
    created_by integer,
    updated_by integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.produits OWNER TO db_user;

--
-- Name: produits_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.produits_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.produits_id_seq OWNER TO db_user;

--
-- Name: produits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.produits_id_seq OWNED BY public.produits.id;


--
-- Name: questions; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.questions (
    id integer NOT NULL,
    text_question character varying(255),
    text_answer text,
    right_answer character varying(255),
    "thematiqueId" integer,
    published_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    thematique integer,
    theme integer
);


ALTER TABLE public.questions OWNER TO db_user;

--
-- Name: questions_components; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.questions_components (
    id integer NOT NULL,
    field character varying(255) NOT NULL,
    "order" integer NOT NULL,
    component_type character varying(255) NOT NULL,
    component_id integer NOT NULL,
    question_id integer NOT NULL
);


ALTER TABLE public.questions_components OWNER TO db_user;

--
-- Name: questions_components_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.questions_components_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.questions_components_id_seq OWNER TO db_user;

--
-- Name: questions_components_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.questions_components_id_seq OWNED BY public.questions_components.id;


--
-- Name: questions_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.questions_id_seq OWNER TO db_user;

--
-- Name: questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.questions_id_seq OWNED BY public.questions.id;


--
-- Name: referents; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.referents (
    id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    zone integer,
    address character varying(255),
    address_zipcode character varying(255),
    address_city character varying(255),
    phone_number character varying(255),
    latitude double precision,
    longitude double precision,
    published_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    environnement integer
);


ALTER TABLE public.referents OWNER TO db_user;

--
-- Name: referents__users; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.referents__users (
    id integer NOT NULL,
    referent_id integer,
    user_id integer
);


ALTER TABLE public.referents__users OWNER TO db_user;

--
-- Name: referents__users_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.referents__users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.referents__users_id_seq OWNER TO db_user;

--
-- Name: referents__users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.referents__users_id_seq OWNED BY public.referents__users.id;


--
-- Name: referents_components; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.referents_components (
    id integer NOT NULL,
    field character varying(255) NOT NULL,
    "order" integer NOT NULL,
    component_type character varying(255) NOT NULL,
    component_id integer NOT NULL,
    referent_id integer NOT NULL
);


ALTER TABLE public.referents_components OWNER TO db_user;

--
-- Name: referents_components_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.referents_components_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.referents_components_id_seq OWNER TO db_user;

--
-- Name: referents_components_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.referents_components_id_seq OWNED BY public.referents_components.id;


--
-- Name: referents_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.referents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.referents_id_seq OWNER TO db_user;

--
-- Name: referents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.referents_id_seq OWNED BY public.referents.id;


--
-- Name: reponses; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.reponses (
    id integer NOT NULL,
    user_id character varying(255),
    question integer,
    quizz_iteration integer,
    response character varying(255),
    published_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.reponses OWNER TO db_user;

--
-- Name: reponses_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.reponses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reponses_id_seq OWNER TO db_user;

--
-- Name: reponses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.reponses_id_seq OWNED BY public.reponses.id;


--
-- Name: responses; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.responses (
    id integer NOT NULL,
    "response_A" character varying(255),
    "response_B" character varying(255),
    "response_C" character varying(255),
    "response_A_neutral" boolean,
    "response_B_neutral" boolean,
    "response_C_neutral" boolean,
    right_answer character varying(255)
);


ALTER TABLE public.responses OWNER TO db_user;

--
-- Name: responses_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.responses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.responses_id_seq OWNER TO db_user;

--
-- Name: responses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.responses_id_seq OWNED BY public.responses.id;


--
-- Name: settings; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.settings (
    id integer NOT NULL,
    nb_points_wrong_answer integer NOT NULL,
    nb_points_neutral_answer integer NOT NULL,
    nb_points_right_answer integer NOT NULL,
    created_by integer,
    updated_by integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.settings OWNER TO db_user;

--
-- Name: settings_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.settings_id_seq OWNER TO db_user;

--
-- Name: settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.settings_id_seq OWNED BY public.settings.id;


--
-- Name: strapi_administrator; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.strapi_administrator (
    id integer NOT NULL,
    firstname character varying(255),
    lastname character varying(255),
    username character varying(255),
    email character varying(255) NOT NULL,
    password character varying(255),
    "resetPasswordToken" character varying(255),
    "registrationToken" character varying(255),
    "isActive" boolean,
    blocked boolean,
    "preferedLanguage" character varying(255)
);


ALTER TABLE public.strapi_administrator OWNER TO db_user;

--
-- Name: strapi_administrator_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.strapi_administrator_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_administrator_id_seq OWNER TO db_user;

--
-- Name: strapi_administrator_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.strapi_administrator_id_seq OWNED BY public.strapi_administrator.id;


--
-- Name: strapi_permission; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.strapi_permission (
    id integer NOT NULL,
    action character varying(255) NOT NULL,
    subject character varying(255),
    properties jsonb,
    conditions jsonb,
    role integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.strapi_permission OWNER TO db_user;

--
-- Name: strapi_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.strapi_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_permission_id_seq OWNER TO db_user;

--
-- Name: strapi_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.strapi_permission_id_seq OWNED BY public.strapi_permission.id;


--
-- Name: strapi_role; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.strapi_role (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    code character varying(255) NOT NULL,
    description character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.strapi_role OWNER TO db_user;

--
-- Name: strapi_role_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.strapi_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_role_id_seq OWNER TO db_user;

--
-- Name: strapi_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.strapi_role_id_seq OWNED BY public.strapi_role.id;


--
-- Name: strapi_users_roles; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.strapi_users_roles (
    id integer NOT NULL,
    user_id integer,
    role_id integer
);


ALTER TABLE public.strapi_users_roles OWNER TO db_user;

--
-- Name: strapi_users_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.strapi_users_roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_users_roles_id_seq OWNER TO db_user;

--
-- Name: strapi_users_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.strapi_users_roles_id_seq OWNED BY public.strapi_users_roles.id;


--
-- Name: strapi_webhooks; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.strapi_webhooks (
    id integer NOT NULL,
    name character varying(255),
    url text,
    headers jsonb,
    events jsonb,
    enabled boolean
);


ALTER TABLE public.strapi_webhooks OWNER TO db_user;

--
-- Name: strapi_webhooks_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.strapi_webhooks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_webhooks_id_seq OWNER TO db_user;

--
-- Name: strapi_webhooks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.strapi_webhooks_id_seq OWNED BY public.strapi_webhooks.id;


--
-- Name: test; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.test (
    id integer NOT NULL,
    test_1 character varying(255),
    test_2 character varying(255),
    published_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.test OWNER TO db_user;

--
-- Name: test_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.test_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.test_id_seq OWNER TO db_user;

--
-- Name: test_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.test_id_seq OWNED BY public.test.id;


--
-- Name: thematiques; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.thematiques (
    id integer NOT NULL,
    title character varying(255),
    published_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    environnement integer,
    question integer
);


ALTER TABLE public.thematiques OWNER TO db_user;

--
-- Name: thematiques_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.thematiques_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.thematiques_id_seq OWNER TO db_user;

--
-- Name: thematiques_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.thematiques_id_seq OWNED BY public.thematiques.id;


--
-- Name: themes; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.themes (
    id integer NOT NULL,
    title character varying(255),
    environnement integer,
    published_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    display_quizz boolean,
    display_quiz boolean,
    title_backoffice character varying(255)
);


ALTER TABLE public.themes OWNER TO db_user;

--
-- Name: themes_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.themes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.themes_id_seq OWNER TO db_user;

--
-- Name: themes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.themes_id_seq OWNED BY public.themes.id;


--
-- Name: upload_file; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.upload_file (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "alternativeText" character varying(255),
    caption character varying(255),
    width integer,
    height integer,
    formats jsonb,
    hash character varying(255) NOT NULL,
    ext character varying(255),
    mime character varying(255) NOT NULL,
    size numeric(10,2) NOT NULL,
    url character varying(255) NOT NULL,
    "previewUrl" character varying(255),
    provider character varying(255) NOT NULL,
    provider_metadata jsonb,
    created_by integer,
    updated_by integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.upload_file OWNER TO db_user;

--
-- Name: upload_file_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.upload_file_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.upload_file_id_seq OWNER TO db_user;

--
-- Name: upload_file_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.upload_file_id_seq OWNED BY public.upload_file.id;


--
-- Name: upload_file_morph; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.upload_file_morph (
    id integer NOT NULL,
    upload_file_id integer,
    related_id integer,
    related_type text,
    field text,
    "order" integer
);


ALTER TABLE public.upload_file_morph OWNER TO db_user;

--
-- Name: upload_file_morph_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.upload_file_morph_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.upload_file_morph_id_seq OWNER TO db_user;

--
-- Name: upload_file_morph_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.upload_file_morph_id_seq OWNED BY public.upload_file_morph.id;


--
-- Name: users-permissions_permission; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public."users-permissions_permission" (
    id integer NOT NULL,
    type character varying(255) NOT NULL,
    controller character varying(255) NOT NULL,
    action character varying(255) NOT NULL,
    enabled boolean NOT NULL,
    policy character varying(255),
    role integer,
    created_by integer,
    updated_by integer
);


ALTER TABLE public."users-permissions_permission" OWNER TO db_user;

--
-- Name: users-permissions_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public."users-permissions_permission_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."users-permissions_permission_id_seq" OWNER TO db_user;

--
-- Name: users-permissions_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public."users-permissions_permission_id_seq" OWNED BY public."users-permissions_permission".id;


--
-- Name: users-permissions_role; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public."users-permissions_role" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255),
    type character varying(255),
    created_by integer,
    updated_by integer
);


ALTER TABLE public."users-permissions_role" OWNER TO db_user;

--
-- Name: users-permissions_role_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public."users-permissions_role_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."users-permissions_role_id_seq" OWNER TO db_user;

--
-- Name: users-permissions_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public."users-permissions_role_id_seq" OWNED BY public."users-permissions_role".id;


--
-- Name: users-permissions_user; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public."users-permissions_user" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    provider character varying(255),
    password character varying(255),
    "resetPasswordToken" character varying(255),
    "confirmationToken" character varying(255),
    confirmed boolean,
    blocked boolean,
    role integer,
    created_by integer,
    updated_by integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."users-permissions_user" OWNER TO db_user;

--
-- Name: users-permissions_user_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public."users-permissions_user_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."users-permissions_user_id_seq" OWNER TO db_user;

--
-- Name: users-permissions_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public."users-permissions_user_id_seq" OWNED BY public."users-permissions_user".id;


--
-- Name: AnswerTexts id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public."AnswerTexts" ALTER COLUMN id SET DEFAULT nextval('public."AnswerTexts_id_seq"'::regclass);


--
-- Name: Feedback id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public."Feedback" ALTER COLUMN id SET DEFAULT nextval('public."Feedback_id_seq"'::regclass);


--
-- Name: answer id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.answer ALTER COLUMN id SET DEFAULT nextval('public.answer_id_seq'::regclass);


--
-- Name: box id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.box ALTER COLUMN id SET DEFAULT nextval('public.box_id_seq'::regclass);


--
-- Name: box-dynamic id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public."box-dynamic" ALTER COLUMN id SET DEFAULT nextval('public."box-dynamic_id_seq"'::regclass);


--
-- Name: box-dynamic_components id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public."box-dynamic_components" ALTER COLUMN id SET DEFAULT nextval('public."box-dynamic_components_id_seq"'::regclass);


--
-- Name: box_components id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.box_components ALTER COLUMN id SET DEFAULT nextval('public.box_components_id_seq'::regclass);


--
-- Name: components_commandes_box_sur_mesure_produits id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.components_commandes_box_sur_mesure_produits ALTER COLUMN id SET DEFAULT nextval('public.components_commandes_box_sur_mesure_produits_id_seq'::regclass);


--
-- Name: components_commandes_box_sur_mesures id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.components_commandes_box_sur_mesures ALTER COLUMN id SET DEFAULT nextval('public.components_commandes_box_sur_mesures_id_seq'::regclass);


--
-- Name: components_commandes_box_sur_mesures_components id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.components_commandes_box_sur_mesures_components ALTER COLUMN id SET DEFAULT nextval('public.components_commandes_box_sur_mesures_components_id_seq'::regclass);


--
-- Name: components_commandes_boxes id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.components_commandes_boxes ALTER COLUMN id SET DEFAULT nextval('public.components_commandes_boxes_id_seq'::regclass);


--
-- Name: components_referents_opening_hours id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.components_referents_opening_hours ALTER COLUMN id SET DEFAULT nextval('public.components_referents_opening_hours_id_seq'::regclass);


--
-- Name: components_referents_openings id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.components_referents_openings ALTER COLUMN id SET DEFAULT nextval('public.components_referents_openings_id_seq'::regclass);


--
-- Name: components_referents_time_tables id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.components_referents_time_tables ALTER COLUMN id SET DEFAULT nextval('public.components_referents_time_tables_id_seq'::regclass);


--
-- Name: components_referents_time_tables_components id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.components_referents_time_tables_components ALTER COLUMN id SET DEFAULT nextval('public.components_referents_time_tables_components_id_seq'::regclass);


--
-- Name: components_stocks_box_produit_sur_mesures id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.components_stocks_box_produit_sur_mesures ALTER COLUMN id SET DEFAULT nextval('public.components_stocks_box_produit_sur_mesures_id_seq'::regclass);


--
-- Name: components_stocks_box_produits id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.components_stocks_box_produits ALTER COLUMN id SET DEFAULT nextval('public.components_stocks_box_produits_id_seq'::regclass);


--
-- Name: contact id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.contact ALTER COLUMN id SET DEFAULT nextval('public.contact_id_seq'::regclass);


--
-- Name: contents id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.contents ALTER COLUMN id SET DEFAULT nextval('public.contents_id_seq'::regclass);


--
-- Name: core_store id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.core_store ALTER COLUMN id SET DEFAULT nextval('public.core_store_id_seq'::regclass);


--
-- Name: environnements id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.environnements ALTER COLUMN id SET DEFAULT nextval('public.environnements_id_seq'::regclass);


--
-- Name: i18n_locales id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.i18n_locales ALTER COLUMN id SET DEFAULT nextval('public.i18n_locales_id_seq'::regclass);


--
-- Name: order id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public."order" ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);


--
-- Name: order_components id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.order_components ALTER COLUMN id SET DEFAULT nextval('public.order_components_id_seq'::regclass);


--
-- Name: produits id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.produits ALTER COLUMN id SET DEFAULT nextval('public.produits_id_seq'::regclass);


--
-- Name: questions id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.questions ALTER COLUMN id SET DEFAULT nextval('public.questions_id_seq'::regclass);


--
-- Name: questions_components id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.questions_components ALTER COLUMN id SET DEFAULT nextval('public.questions_components_id_seq'::regclass);


--
-- Name: referents id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.referents ALTER COLUMN id SET DEFAULT nextval('public.referents_id_seq'::regclass);


--
-- Name: referents__users id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.referents__users ALTER COLUMN id SET DEFAULT nextval('public.referents__users_id_seq'::regclass);


--
-- Name: referents_components id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.referents_components ALTER COLUMN id SET DEFAULT nextval('public.referents_components_id_seq'::regclass);


--
-- Name: reponses id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.reponses ALTER COLUMN id SET DEFAULT nextval('public.reponses_id_seq'::regclass);


--
-- Name: responses id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.responses ALTER COLUMN id SET DEFAULT nextval('public.responses_id_seq'::regclass);


--
-- Name: settings id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.settings ALTER COLUMN id SET DEFAULT nextval('public.settings_id_seq'::regclass);


--
-- Name: strapi_administrator id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.strapi_administrator ALTER COLUMN id SET DEFAULT nextval('public.strapi_administrator_id_seq'::regclass);


--
-- Name: strapi_permission id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.strapi_permission ALTER COLUMN id SET DEFAULT nextval('public.strapi_permission_id_seq'::regclass);


--
-- Name: strapi_role id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.strapi_role ALTER COLUMN id SET DEFAULT nextval('public.strapi_role_id_seq'::regclass);


--
-- Name: strapi_users_roles id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.strapi_users_roles ALTER COLUMN id SET DEFAULT nextval('public.strapi_users_roles_id_seq'::regclass);


--
-- Name: strapi_webhooks id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.strapi_webhooks ALTER COLUMN id SET DEFAULT nextval('public.strapi_webhooks_id_seq'::regclass);


--
-- Name: test id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.test ALTER COLUMN id SET DEFAULT nextval('public.test_id_seq'::regclass);


--
-- Name: thematiques id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.thematiques ALTER COLUMN id SET DEFAULT nextval('public.thematiques_id_seq'::regclass);


--
-- Name: themes id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.themes ALTER COLUMN id SET DEFAULT nextval('public.themes_id_seq'::regclass);


--
-- Name: upload_file id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.upload_file ALTER COLUMN id SET DEFAULT nextval('public.upload_file_id_seq'::regclass);


--
-- Name: upload_file_morph id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.upload_file_morph ALTER COLUMN id SET DEFAULT nextval('public.upload_file_morph_id_seq'::regclass);


--
-- Name: users-permissions_permission id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public."users-permissions_permission" ALTER COLUMN id SET DEFAULT nextval('public."users-permissions_permission_id_seq"'::regclass);


--
-- Name: users-permissions_role id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public."users-permissions_role" ALTER COLUMN id SET DEFAULT nextval('public."users-permissions_role_id_seq"'::regclass);


--
-- Name: users-permissions_user id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public."users-permissions_user" ALTER COLUMN id SET DEFAULT nextval('public."users-permissions_user_id_seq"'::regclass);


--
-- Data for Name: AnswerTexts; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public."AnswerTexts" (id, "ResponseOui", "ReponseNon", "ReponseAutre", response_yes, response_no, response_unknow, "response_A", "response_B", "response_C", "response_A_neutral", "response_B_neutral", "response_C_neutral") FROM stdin;
5	\N	\N	\N	Oui	Non	Je ne sais pas	\N	\N	\N	\N	\N	\N
6	\N	\N	\N	Oui	Non	Je ne sais pas	\N	\N	\N	\N	\N	\N
1	\N	\N	\N	Oui, on peut !	Non	Je ne sais pas	\N	\N	\N	\N	\N	\N
7	\N	\N	\N	Oui	Non	Je ne sais pas	\N	\N	\N	\N	\N	\N
9	\N	\N	\N	\N	\N	\N	Oui	Non	Je ne sais pas	\N	\N	\N
10	\N	\N	\N	\N	\N	\N	Oui	Non	Je ne sais pas	\N	\N	\N
11	\N	\N	\N	\N	\N	\N	Oui	Non	Je ne sais pas	\N	\N	\N
12	\N	\N	\N	\N	\N	\N	Oui	Non	Je ne sais pas	f	f	t
\.


--
-- Data for Name: Feedback; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public."Feedback" (id, "Title", created_by, updated_by, created_at, updated_at, title, question_id, question, body, "isLiked", "isDisliked", appreciation) FROM stdin;
\.


--
-- Data for Name: answer; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.answer (id, text, "isCorrect", "isNeutral", published_at, created_by, updated_by, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: box; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.box (id, title, published_at, created_by, updated_by, created_at, updated_at, stock, zone, environnement, description, available, number) FROM stdin;
\.


--
-- Data for Name: box-dynamic; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public."box-dynamic" (id, title, description, published_at, created_by, updated_by, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: box-dynamic_components; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public."box-dynamic_components" (id, field, "order", component_type, component_id, "box-dynamic_id") FROM stdin;
\.


--
-- Data for Name: box_components; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.box_components (id, field, "order", component_type, component_id, box_id) FROM stdin;
\.


--
-- Data for Name: components_commandes_box_sur_mesure_produits; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.components_commandes_box_sur_mesure_produits (id, produit, quantity) FROM stdin;
1	1	10
\.


--
-- Data for Name: components_commandes_box_sur_mesures; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.components_commandes_box_sur_mesures (id) FROM stdin;
1
\.


--
-- Data for Name: components_commandes_box_sur_mesures_components; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.components_commandes_box_sur_mesures_components (id, field, "order", component_type, component_id, components_commandes_box_sur_mesure_id) FROM stdin;
1	produits	1	components_commandes_box_sur_mesure_produits	1	1
\.


--
-- Data for Name: components_commandes_boxes; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.components_commandes_boxes (id, box) FROM stdin;
1	1
\.


--
-- Data for Name: components_referents_opening_hours; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.components_referents_opening_hours (id, hours, monday_title, monday_value, tuesday_title, tuesday_value, wednesday_title, wednesday_value, thursday_title, thursday_value, friday_title, friday_value, saturday_title, saturday_value, sunday_title, sunday_value) FROM stdin;
\.


--
-- Data for Name: components_referents_openings; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.components_referents_openings (id, monday_title, monday_value) FROM stdin;
\.


--
-- Data for Name: components_referents_time_tables; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.components_referents_time_tables (id, day) FROM stdin;
\.


--
-- Data for Name: components_referents_time_tables_components; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.components_referents_time_tables_components (id, field, "order", component_type, component_id, components_referents_time_table_id) FROM stdin;
\.


--
-- Data for Name: components_stocks_box_produit_sur_mesures; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.components_stocks_box_produit_sur_mesures (id, stock, produit) FROM stdin;
\.


--
-- Data for Name: components_stocks_box_produits; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.components_stocks_box_produits (id, quantity, produit) FROM stdin;
\.


--
-- Data for Name: contact; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.contact (id, name, email, created_by, updated_by, created_at, updated_at, zipcode, box, zone, type) FROM stdin;
\.


--
-- Data for Name: contents; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.contents (id, title, text, link, comment, "thematiqueId", published_at, created_by, updated_by, created_at, updated_at, theme) FROM stdin;
\.


--
-- Data for Name: core_store; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.core_store (id, key, value, type, environment, tag) FROM stdin;
23	plugin_content_manager_configuration_content_types::plugins::i18n.locale	{"uid":"plugins::i18n.locale","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"name":{"edit":{"label":"Name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Name","searchable":true,"sortable":true}},"code":{"edit":{"label":"Code","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Code","searchable":true,"sortable":true}},"created_at":{"edit":{"label":"Created_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Created_at","searchable":true,"sortable":true}},"updated_at":{"edit":{"label":"Updated_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Updated_at","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","code","created_at"],"editRelations":[],"edit":[[{"name":"name","size":6},{"name":"code","size":6}]]}}	object		
22	plugin_content_manager_configuration_content_types::strapi::user	{"uid":"strapi::user","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"firstname","defaultSortBy":"firstname","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"firstname":{"edit":{"label":"Firstname","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Firstname","searchable":true,"sortable":true}},"lastname":{"edit":{"label":"Lastname","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Lastname","searchable":true,"sortable":true}},"username":{"edit":{"label":"Username","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Username","searchable":true,"sortable":true}},"email":{"edit":{"label":"Email","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Email","searchable":true,"sortable":true}},"password":{"edit":{"label":"Password","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Password","searchable":true,"sortable":true}},"resetPasswordToken":{"edit":{"label":"ResetPasswordToken","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"ResetPasswordToken","searchable":true,"sortable":true}},"registrationToken":{"edit":{"label":"RegistrationToken","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"RegistrationToken","searchable":true,"sortable":true}},"isActive":{"edit":{"label":"IsActive","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"IsActive","searchable":true,"sortable":true}},"roles":{"edit":{"label":"Roles","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"Roles","searchable":false,"sortable":false}},"blocked":{"edit":{"label":"Blocked","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Blocked","searchable":true,"sortable":true}},"preferedLanguage":{"edit":{"label":"PreferedLanguage","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"PreferedLanguage","searchable":true,"sortable":true}}},"layouts":{"list":["id","firstname","lastname","username"],"editRelations":["roles"],"edit":[[{"name":"firstname","size":6},{"name":"lastname","size":6}],[{"name":"username","size":6},{"name":"email","size":6}],[{"name":"password","size":6},{"name":"resetPasswordToken","size":6}],[{"name":"registrationToken","size":6},{"name":"isActive","size":4}],[{"name":"blocked","size":4},{"name":"preferedLanguage","size":6}]]}}	object		
16	plugin_upload_settings	{"sizeOptimization":true,"responsiveDimensions":true}	object	development	
26	plugin_content_manager_configuration_content_types::plugins::upload.file	{"uid":"plugins::upload.file","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"name":{"edit":{"label":"Name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Name","searchable":true,"sortable":true}},"alternativeText":{"edit":{"label":"AlternativeText","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"AlternativeText","searchable":true,"sortable":true}},"caption":{"edit":{"label":"Caption","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Caption","searchable":true,"sortable":true}},"width":{"edit":{"label":"Width","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Width","searchable":true,"sortable":true}},"height":{"edit":{"label":"Height","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Height","searchable":true,"sortable":true}},"formats":{"edit":{"label":"Formats","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Formats","searchable":false,"sortable":false}},"hash":{"edit":{"label":"Hash","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Hash","searchable":true,"sortable":true}},"ext":{"edit":{"label":"Ext","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Ext","searchable":true,"sortable":true}},"mime":{"edit":{"label":"Mime","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Mime","searchable":true,"sortable":true}},"size":{"edit":{"label":"Size","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Size","searchable":true,"sortable":true}},"url":{"edit":{"label":"Url","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Url","searchable":true,"sortable":true}},"previewUrl":{"edit":{"label":"PreviewUrl","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"PreviewUrl","searchable":true,"sortable":true}},"provider":{"edit":{"label":"Provider","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Provider","searchable":true,"sortable":true}},"provider_metadata":{"edit":{"label":"Provider_metadata","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Provider_metadata","searchable":false,"sortable":false}},"related":{"edit":{"label":"Related","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Related","searchable":false,"sortable":false}},"created_at":{"edit":{"label":"Created_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Created_at","searchable":true,"sortable":true}},"updated_at":{"edit":{"label":"Updated_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Updated_at","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","alternativeText","caption"],"editRelations":["related"],"edit":[[{"name":"name","size":6},{"name":"alternativeText","size":6}],[{"name":"caption","size":6},{"name":"width","size":4}],[{"name":"height","size":4}],[{"name":"formats","size":12}],[{"name":"hash","size":6},{"name":"ext","size":6}],[{"name":"mime","size":6},{"name":"size","size":4}],[{"name":"url","size":6},{"name":"previewUrl","size":6}],[{"name":"provider","size":6}],[{"name":"provider_metadata","size":12}]]}}	object		
15	plugin_users-permissions_grant	{"email":{"enabled":true,"icon":"envelope"},"discord":{"enabled":false,"icon":"discord","key":"","secret":"","callback":"/auth/discord/callback","scope":["identify","email"]},"facebook":{"enabled":false,"icon":"facebook-square","key":"","secret":"","callback":"/auth/facebook/callback","scope":["email"]},"google":{"enabled":false,"icon":"google","key":"","secret":"","callback":"/auth/google/callback","scope":["email"]},"github":{"enabled":false,"icon":"github","key":"","secret":"","callback":"/auth/github/callback","scope":["user","user:email"]},"microsoft":{"enabled":false,"icon":"windows","key":"","secret":"","callback":"/auth/microsoft/callback","scope":["user.read"]},"twitter":{"enabled":false,"icon":"twitter","key":"","secret":"","callback":"/auth/twitter/callback"},"instagram":{"enabled":false,"icon":"instagram","key":"","secret":"","callback":"/auth/instagram/callback","scope":["user_profile"]},"vk":{"enabled":false,"icon":"vk","key":"","secret":"","callback":"/auth/vk/callback","scope":["email"]},"twitch":{"enabled":false,"icon":"twitch","key":"","secret":"","callback":"/auth/twitch/callback","scope":["user:read:email"]},"linkedin":{"enabled":false,"icon":"linkedin","key":"","secret":"","callback":"/auth/linkedin/callback","scope":["r_liteprofile","r_emailaddress"]},"cognito":{"enabled":false,"icon":"aws","key":"","secret":"","subdomain":"my.subdomain.com","callback":"/auth/cognito/callback","scope":["email","openid","profile"]},"reddit":{"enabled":false,"icon":"reddit","key":"","secret":"","state":true,"callback":"/auth/reddit/callback","scope":["identity"]},"auth0":{"enabled":false,"icon":"","key":"","secret":"","subdomain":"my-tenant.eu","callback":"/auth/auth0/callback","scope":["openid","email","profile"]}}	object		
14	model_def_plugins::users-permissions.user	{"uid":"plugins::users-permissions.user","collectionName":"users-permissions_user","kind":"collectionType","info":{"name":"user","description":""},"options":{"draftAndPublish":false,"timestamps":["created_at","updated_at"]},"attributes":{"username":{"type":"string","minLength":3,"unique":true,"configurable":false,"required":true},"email":{"type":"email","minLength":6,"configurable":false,"required":true},"provider":{"type":"string","configurable":false},"password":{"type":"password","minLength":6,"configurable":false,"private":true},"resetPasswordToken":{"type":"string","configurable":false,"private":true},"confirmationToken":{"type":"string","configurable":false,"private":true},"confirmed":{"type":"boolean","default":false,"configurable":false},"blocked":{"type":"boolean","default":false,"configurable":false},"role":{"model":"role","via":"users","plugin":"users-permissions","configurable":false},"created_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true},"updated_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true}}}	object	\N	\N
29	plugin_i18n_default_locale	"fr"	string		
13	model_def_plugins::users-permissions.role	{"uid":"plugins::users-permissions.role","collectionName":"users-permissions_role","kind":"collectionType","info":{"name":"role","description":""},"options":{"draftAndPublish":false,"timestamps":false},"pluginOptions":{"content-manager":{"visible":false}},"attributes":{"name":{"type":"string","minLength":3,"required":true,"configurable":false},"description":{"type":"string","configurable":false},"type":{"type":"string","unique":true,"configurable":false},"permissions":{"collection":"permission","via":"role","plugin":"users-permissions","configurable":false,"isVirtual":true},"users":{"collection":"user","via":"role","configurable":false,"plugin":"users-permissions","isVirtual":true},"created_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true},"updated_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true}}}	object	\N	\N
20	plugin_content_manager_configuration_content_types::strapi::permission	{"uid":"strapi::permission","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"action","defaultSortBy":"action","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"action":{"edit":{"label":"Action","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Action","searchable":true,"sortable":true}},"subject":{"edit":{"label":"Subject","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Subject","searchable":true,"sortable":true}},"properties":{"edit":{"label":"Properties","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Properties","searchable":false,"sortable":false}},"conditions":{"edit":{"label":"Conditions","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Conditions","searchable":false,"sortable":false}},"role":{"edit":{"label":"Role","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"Role","searchable":true,"sortable":true}},"created_at":{"edit":{"label":"Created_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Created_at","searchable":true,"sortable":true}},"updated_at":{"edit":{"label":"Updated_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Updated_at","searchable":true,"sortable":true}}},"layouts":{"list":["id","action","subject","role"],"editRelations":["role"],"edit":[[{"name":"action","size":6},{"name":"subject","size":6}],[{"name":"properties","size":12}],[{"name":"conditions","size":12}]]}}	object		
31	plugin_users-permissions_advanced	{"unique_email":true,"allow_register":true,"email_confirmation":false,"email_reset_password":null,"email_confirmation_redirection":null,"default_role":"authenticated"}	object		
30	plugin_users-permissions_email	{"reset_password":{"display":"Email.template.reset_password","icon":"sync","options":{"from":{"name":"Administration Panel","email":"no-reply@strapi.io"},"response_email":"","object":"Reset password","message":"<p>We heard that you lost your password. Sorry about that!</p>\\n\\n<p>But don’t worry! You can use the following link to reset your password:</p>\\n<p><%= URL %>?code=<%= TOKEN %></p>\\n\\n<p>Thanks.</p>"}},"email_confirmation":{"display":"Email.template.email_confirmation","icon":"check-square","options":{"from":{"name":"Administration Panel","email":"no-reply@strapi.io"},"response_email":"","object":"Account confirmation","message":"<p>Thank you for registering!</p>\\n\\n<p>You have to confirm your email address. Please click on the link below.</p>\\n\\n<p><%= URL %>?confirmation=<%= CODE %></p>\\n\\n<p>Thanks.</p>"}}}	object		
27	plugin_content_manager_configuration_content_types::strapi::role	{"uid":"strapi::role","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"name":{"edit":{"label":"Name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Name","searchable":true,"sortable":true}},"code":{"edit":{"label":"Code","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Code","searchable":true,"sortable":true}},"description":{"edit":{"label":"Description","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Description","searchable":true,"sortable":true}},"users":{"edit":{"label":"Users","description":"","placeholder":"","visible":true,"editable":true,"mainField":"firstname"},"list":{"label":"Users","searchable":false,"sortable":false}},"permissions":{"edit":{"label":"Permissions","description":"","placeholder":"","visible":true,"editable":true,"mainField":"action"},"list":{"label":"Permissions","searchable":false,"sortable":false}},"created_at":{"edit":{"label":"Created_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Created_at","searchable":true,"sortable":true}},"updated_at":{"edit":{"label":"Updated_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Updated_at","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","code","description"],"editRelations":["users","permissions"],"edit":[[{"name":"name","size":6},{"name":"code","size":6}],[{"name":"description","size":6}]]}}	object		
12	model_def_plugins::users-permissions.permission	{"uid":"plugins::users-permissions.permission","collectionName":"users-permissions_permission","kind":"collectionType","info":{"name":"permission","description":""},"options":{"timestamps":false},"pluginOptions":{"content-manager":{"visible":false}},"attributes":{"type":{"type":"string","required":true,"configurable":false},"controller":{"type":"string","required":true,"configurable":false},"action":{"type":"string","required":true,"configurable":false},"enabled":{"type":"boolean","required":true,"configurable":false},"policy":{"type":"string","configurable":false},"role":{"model":"role","via":"permissions","plugin":"users-permissions","configurable":false},"created_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true},"updated_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true}}}	object	\N	\N
17	plugin_content_manager_configuration_content_types::application::environnement.environnement	{"uid":"application::environnement.environnement","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"name":{"edit":{"label":"Name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Name","searchable":true,"sortable":true}},"slug":{"edit":{"label":"Slug","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Slug","searchable":true,"sortable":true}},"created_at":{"edit":{"label":"Created_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Created_at","searchable":true,"sortable":true}},"updated_at":{"edit":{"label":"Updated_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Updated_at","searchable":true,"sortable":true}}},"layouts":{"edit":[[{"name":"name","size":6},{"name":"slug","size":6}]],"editRelations":[],"list":["name","slug"]}}	object		
18	plugin_content_manager_configuration_content_types::application::content.content	{"uid":"application::content.content","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"title","defaultSortBy":"title","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"title":{"edit":{"label":"Titre","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Titre","searchable":true,"sortable":true}},"text":{"edit":{"label":"Contenu","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Text","searchable":false,"sortable":false}},"image":{"edit":{"label":"Image","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Image","searchable":false,"sortable":false}},"sound":{"edit":{"label":"Audio","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Sound","searchable":false,"sortable":false}},"theme":{"edit":{"label":"Thématique","description":"","placeholder":"","visible":true,"editable":true,"mainField":"title_backoffice"},"list":{"label":"Thématique","searchable":true,"sortable":true}},"created_at":{"edit":{"label":"Created_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Created_at","searchable":true,"sortable":true}},"updated_at":{"edit":{"label":"Updated_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Updated_at","searchable":true,"sortable":true}}},"layouts":{"edit":[[{"name":"title","size":6}],[{"name":"text","size":12}],[{"name":"image","size":6},{"name":"sound","size":6}]],"editRelations":["theme"],"list":["title","theme","image"]}}	object		
6	model_def_strapi::webhooks	{"uid":"strapi::webhooks","collectionName":"strapi_webhooks","info":{"name":"Strapi webhooks","description":""},"options":{"timestamps":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string"},"url":{"type":"text"},"headers":{"type":"json"},"events":{"type":"json"},"enabled":{"type":"boolean"}}}	object	\N	\N
75	plugin_content_manager_configuration_components::referents.opening-hours	{"uid":"referents.opening-hours","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"monday_title","defaultSortBy":"monday_title","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":false,"sortable":false}},"monday_title":{"edit":{"label":"Monday_title","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Monday_title","searchable":true,"sortable":true}},"monday_value":{"edit":{"label":"Monday_value","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Monday_value","searchable":true,"sortable":true}},"tuesday_title":{"edit":{"label":"Tuesday_title","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Tuesday_title","searchable":true,"sortable":true}},"tuesday_value":{"edit":{"label":"Tuesday_value","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Tuesday_value","searchable":true,"sortable":true}},"wednesday_title":{"edit":{"label":"Wednesday_title","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Wednesday_title","searchable":true,"sortable":true}},"wednesday_value":{"edit":{"label":"Wednesday_value","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Wednesday_value","searchable":true,"sortable":true}},"thursday_title":{"edit":{"label":"Thursday_title","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Thursday_title","searchable":true,"sortable":true}},"thursday_value":{"edit":{"label":"Thursday_value","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Thursday_value","searchable":true,"sortable":true}},"friday_title":{"edit":{"label":"Friday_title","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Friday_title","searchable":true,"sortable":true}},"friday_value":{"edit":{"label":"Friday_value","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Friday_value","searchable":true,"sortable":true}},"saturday_title":{"edit":{"label":"Saturday_title","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Saturday_title","searchable":true,"sortable":true}},"saturday_value":{"edit":{"label":"Saturday_value","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Saturday_value","searchable":true,"sortable":true}},"sunday_title":{"edit":{"label":"Sunday_title","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Sunday_title","searchable":true,"sortable":true}},"sunday_value":{"edit":{"label":"Sunday_value","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Sunday_value","searchable":true,"sortable":true}}},"layouts":{"list":["id","monday_title","monday_value","tuesday_title"],"edit":[[{"name":"monday_title","size":6},{"name":"monday_value","size":6}],[{"name":"tuesday_title","size":6},{"name":"tuesday_value","size":6}],[{"name":"wednesday_title","size":6},{"name":"wednesday_value","size":6}],[{"name":"thursday_title","size":6},{"name":"thursday_value","size":6}],[{"name":"friday_title","size":6},{"name":"friday_value","size":6}],[{"name":"saturday_title","size":6},{"name":"saturday_value","size":6}],[{"name":"sunday_title","size":6},{"name":"sunday_value","size":6}]],"editRelations":[]},"isComponent":true}	object		
35	model_def_application::test.test	{"uid":"application::test.test","collectionName":"test","kind":"singleType","info":{"name":"Test"},"options":{"increments":true,"timestamps":["created_at","updated_at"],"draftAndPublish":true},"pluginOptions":{},"attributes":{"test_1":{"type":"string"},"test_2":{"type":"string"},"published_at":{"type":"datetime","configurable":false,"writable":true,"visible":false},"created_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true},"updated_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true}}}	object	\N	\N
32	core_admin_auth	{"providers":{"autoRegister":false,"defaultRole":null}}	object		
21	plugin_content_manager_configuration_content_types::application::question.question	{"uid":"application::question.question","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"text_question","defaultSortBy":"text_question","defaultSortOrder":"ASC"},"metadatas":{"theme":{"edit":{"label":"Thématique","description":"","placeholder":"","visible":true,"editable":true,"mainField":"title_backoffice"},"list":{"label":"Theme","searchable":true,"sortable":true}},"created_at":{"edit":{"label":"Created_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Created_at","searchable":true,"sortable":true}},"sound_answer":{"edit":{"label":"Audio réponse","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Sound_answer","searchable":false,"sortable":false}},"text_answer":{"edit":{"label":"Précision de la réponse","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Text_answer","searchable":true,"sortable":true}},"responses":{"edit":{"label":"Réponses","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Responses","searchable":false,"sortable":false}},"sound_question":{"edit":{"label":"Audio question","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Sound_question","searchable":false,"sortable":false}},"updated_at":{"edit":{"label":"Updated_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Updated_at","searchable":true,"sortable":true}},"text_question":{"edit":{"label":"Question","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Question","searchable":true,"sortable":true}},"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"image":{"edit":{"label":"Image","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Image","searchable":false,"sortable":false}}},"layouts":{"edit":[[{"name":"text_question","size":6}],[{"name":"image","size":6}],[{"name":"responses","size":12}],[{"name":"text_answer","size":6}],[{"name":"sound_question","size":6},{"name":"sound_answer","size":6}]],"editRelations":["theme"],"list":["text_question","image","theme"]}}	object		
37	model_def_application::answer.answer	{"uid":"application::answer.answer","collectionName":"answer","kind":"collectionType","info":{"name":"Answer"},"options":{"increments":true,"timestamps":["created_at","updated_at"],"draftAndPublish":true},"pluginOptions":{},"attributes":{"text":{"type":"string"},"isCorrect":{"type":"boolean"},"isNeutral":{"type":"boolean"},"published_at":{"type":"datetime","configurable":false,"writable":true,"visible":false},"created_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true},"updated_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true}}}	object	\N	\N
46	plugin_content_manager_configuration_components::stocks.box-produit	{"uid":"stocks.box-produit","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"id","defaultSortBy":"id","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":false,"sortable":false}},"quantity":{"edit":{"label":"Quantité","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Quantity","searchable":true,"sortable":true}},"produit":{"edit":{"label":"Produit","description":"","placeholder":"","visible":true,"editable":true,"mainField":"title"},"list":{"label":"Produit","searchable":true,"sortable":true}}},"layouts":{"list":["id","quantity","produit"],"edit":[[{"name":"produit","size":6},{"name":"quantity","size":4}]],"editRelations":[]},"isComponent":true}	object		
50	plugin_content_manager_configuration_content_types::application::parametres.parametres	{"uid":"application::parametres.parametres","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"id","defaultSortBy":"id","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"nb_points_wrong_answer":{"edit":{"label":"Nb points mauvaise réponse","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Nb_points_wrong_answer","searchable":true,"sortable":true}},"nb_points_neutral_answer":{"edit":{"label":"Nb points réponse neutre","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Nb_points_neutral_answer","searchable":true,"sortable":true}},"nb_points_right_answer":{"edit":{"label":"Nb points bonne réponse","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Nb_points_right_answer","searchable":true,"sortable":true}},"created_at":{"edit":{"label":"Created_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Created_at","searchable":true,"sortable":true}},"updated_at":{"edit":{"label":"Updated_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Updated_at","searchable":true,"sortable":true}}},"layouts":{"edit":[[{"name":"nb_points_wrong_answer","size":4},{"name":"nb_points_neutral_answer","size":4},{"name":"nb_points_right_answer","size":4}]],"editRelations":[],"list":["id","nb_points_wrong_answer","nb_points_neutral_answer","nb_points_right_answer"]}}	object		
34	plugin_content_manager_configuration_components::contenus.reponses-textes	{"uid":"contenus.reponses-textes","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"response_A","defaultSortBy":"response_A","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":false,"sortable":false}},"response_A":{"edit":{"label":"Réponse A","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Response_A","searchable":true,"sortable":true}},"response_B":{"edit":{"label":"Réponse B","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Response_B","searchable":true,"sortable":true}},"response_C":{"edit":{"label":"Réponse C","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Response_C","searchable":true,"sortable":true}},"response_A_neutral":{"edit":{"label":"Est-ce une réponse neutre ?","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Response_A_neutral","searchable":true,"sortable":true}},"response_B_neutral":{"edit":{"label":"Est-ce une réponse neutre ?","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Response_B_neutral","searchable":true,"sortable":true}},"response_C_neutral":{"edit":{"label":"Est-ce une réponse neutre ?","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Response_C_neutral","searchable":true,"sortable":true}},"right_answer":{"edit":{"label":"Bonne réponse","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Right_answer","searchable":true,"sortable":true}}},"layouts":{"list":["id","response_A","response_B","response_C"],"edit":[[{"name":"response_A","size":6},{"name":"response_A_neutral","size":4}],[{"name":"response_B","size":6},{"name":"response_B_neutral","size":4}],[{"name":"response_C","size":6},{"name":"response_C_neutral","size":4}],[{"name":"right_answer","size":6}]],"editRelations":[]},"isComponent":true}	object		
74	plugin_content_manager_configuration_components::referents.time-table	{"uid":"referents.time-table","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"day","defaultSortBy":"day","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":false,"sortable":false}},"day":{"edit":{"label":"Day","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Day","searchable":true,"sortable":true}},"openingHours":{"edit":{"label":"OpeningHours","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"OpeningHours","searchable":false,"sortable":false}}},"layouts":{"list":["id","day"],"edit":[[{"name":"day","size":6}],[{"name":"openingHours","size":12}]],"editRelations":[]},"isComponent":true}	object		
42	plugin_content_manager_configuration_content_types::application::feedback.feedback	{"uid":"application::feedback.feedback","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"title","defaultSortBy":"title","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"title":{"edit":{"label":"Titre","description":"","placeholder":"","visible":true,"editable":false},"list":{"label":"Titre","searchable":true,"sortable":true}},"question":{"edit":{"label":"Question","description":"","placeholder":"","visible":true,"editable":true,"mainField":"text_question"},"list":{"label":"Question","searchable":true,"sortable":true}},"body":{"edit":{"label":"Contenu","description":"","placeholder":"","visible":true,"editable":false},"list":{"label":"Contenu","searchable":true,"sortable":true}},"appreciation":{"edit":{"label":"Appreciation","description":"","placeholder":"","visible":true,"editable":false},"list":{"label":"Appreciation","searchable":true,"sortable":true}},"created_at":{"edit":{"label":"Created_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Créé le ","searchable":true,"sortable":true}},"updated_at":{"edit":{"label":"Updated_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Updated_at","searchable":true,"sortable":true}}},"layouts":{"edit":[[{"name":"title","size":6},{"name":"appreciation","size":4}],[{"name":"body","size":6}]],"editRelations":["question"],"list":["title","body","question","appreciation"]}}	object		
41	model_def_application::feedback.feedback	{"uid":"application::feedback.feedback","collectionName":"Feedback","kind":"collectionType","info":{"name":"Feedback","description":""},"options":{"increments":true,"timestamps":["created_at","updated_at"],"draftAndPublish":false},"pluginOptions":{},"attributes":{"title":{"type":"string"},"question":{"model":"question"},"body":{"type":"text"},"appreciation":{"type":"integer","max":1,"min":-1,"required":true,"default":0},"created_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true},"updated_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true}}}	object	\N	\N
48	plugin_content_manager_configuration_content_types::application::produit.produit	{"uid":"application::produit.produit","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"title","defaultSortBy":"title","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"title":{"edit":{"label":"Title","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Titre","searchable":true,"sortable":true}},"description":{"edit":{"label":"Description","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Description","searchable":true,"sortable":true}},"image":{"edit":{"label":"Image","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Image","searchable":false,"sortable":false}},"created_at":{"edit":{"label":"Created_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Created_at","searchable":true,"sortable":true}},"updated_at":{"edit":{"label":"Updated_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Updated_at","searchable":true,"sortable":true}}},"layouts":{"edit":[[{"name":"title","size":6}],[{"name":"description","size":6},{"name":"image","size":6}]],"editRelations":[],"list":["title","image"]}}	object		
53	plugin_content_manager_configuration_components::stocks.box-produit-sur-mesure	{"uid":"stocks.box-produit-sur-mesure","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"id","defaultSortBy":"id","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":false,"sortable":false}},"stock":{"edit":{"label":"Quantité disponible","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Stock","searchable":true,"sortable":true}},"produit":{"edit":{"label":"Produit","description":"","placeholder":"","visible":true,"editable":true,"mainField":"title"},"list":{"label":"Produit","searchable":true,"sortable":true}}},"layouts":{"list":["id","stock","produit"],"edit":[[{"name":"produit","size":6},{"name":"stock","size":4}]],"editRelations":[]},"isComponent":true}	object		
52	model_def_application::box-sur-mesure.box-sur-mesure	{"uid":"application::box-sur-mesure.box-sur-mesure","collectionName":"box-dynamic","kind":"singleType","info":{"name":"Box sur mesure","description":""},"options":{"increments":true,"timestamps":["created_at","updated_at"],"draftAndPublish":true},"pluginOptions":{},"attributes":{"title":{"type":"string","required":true},"description":{"type":"text","required":true},"image":{"model":"file","via":"related","allowedTypes":["images","files","videos"],"plugin":"upload","required":false,"pluginOptions":{}},"produits":{"type":"component","repeatable":true,"component":"stocks.box-produit-sur-mesure"},"published_at":{"type":"datetime","configurable":false,"writable":true,"visible":false},"created_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true},"updated_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true}}}	object	\N	\N
58	plugin_content_manager_configuration_components::commandes.box-sur-mesure-produit	{"uid":"commandes.box-sur-mesure-produit","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"id","defaultSortBy":"id","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":false,"sortable":false}},"produit":{"edit":{"label":"Produit","description":"","placeholder":"","visible":true,"editable":true,"mainField":"title"},"list":{"label":"Produit","searchable":true,"sortable":true}},"quantity":{"edit":{"label":"Quantité","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Quantity","searchable":true,"sortable":true}}},"layouts":{"list":["id","produit","quantity"],"edit":[[{"name":"produit","size":6},{"name":"quantity","size":4}]],"editRelations":[]},"isComponent":true}	object		
56	plugin_content_manager_configuration_components::commandes.box	{"uid":"commandes.box","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"id","defaultSortBy":"id","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":false,"sortable":false}},"box":{"edit":{"label":"Box","description":"","placeholder":"","visible":true,"editable":true,"mainField":"title"},"list":{"label":"Box","searchable":true,"sortable":true}}},"layouts":{"list":["id","box"],"edit":[[{"name":"box","size":6}]],"editRelations":[]},"isComponent":true}	object		
60	plugin_content_manager_configuration_components::commandes.box-sur-mesure	{"uid":"commandes.box-sur-mesure","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"id","defaultSortBy":"id","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":false,"sortable":false}},"produits":{"edit":{"label":"Produits","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Produits","searchable":false,"sortable":false}}},"layouts":{"list":["id"],"edit":[[{"name":"produits","size":12}]],"editRelations":[]},"isComponent":true}	object		
63	model_def_application::reponse.reponse	{"uid":"application::reponse.reponse","collectionName":"reponses","kind":"collectionType","info":{"name":"Reponses","description":""},"options":{"increments":true,"timestamps":["created_at","updated_at"],"draftAndPublish":true},"pluginOptions":{},"attributes":{"user_id":{"type":"string"},"question":{"model":"question"},"quizz_iteration":{"type":"integer"},"response":{"type":"string"},"published_at":{"type":"datetime","configurable":false,"writable":true,"visible":false},"created_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true},"updated_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true}}}	object	\N	\N
7	model_def_strapi::permission	{"uid":"strapi::permission","collectionName":"strapi_permission","kind":"collectionType","info":{"name":"Permission","description":""},"options":{"timestamps":["created_at","updated_at"]},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"action":{"type":"string","minLength":1,"configurable":false,"required":true},"subject":{"type":"string","minLength":1,"configurable":false,"required":false},"properties":{"type":"json","configurable":false,"required":false,"default":{}},"conditions":{"type":"json","configurable":false,"required":false,"default":[]},"role":{"configurable":false,"model":"role","plugin":"admin"}}}	object	\N	\N
54	plugin_content_manager_configuration_content_types::application::box-sur-mesure.box-sur-mesure	{"uid":"application::box-sur-mesure.box-sur-mesure","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"title","defaultSortBy":"title","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"title":{"edit":{"label":"Titre","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Title","searchable":true,"sortable":true}},"description":{"edit":{"label":"Description","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Description","searchable":true,"sortable":true}},"image":{"edit":{"label":"Image","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Image","searchable":false,"sortable":false}},"produits":{"edit":{"label":"Produits","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Produits","searchable":false,"sortable":false}},"created_at":{"edit":{"label":"Created_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Created_at","searchable":true,"sortable":true}},"updated_at":{"edit":{"label":"Updated_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Updated_at","searchable":true,"sortable":true}}},"layouts":{"edit":[[{"name":"title","size":6}],[{"name":"description","size":6},{"name":"image","size":6}],[{"name":"produits","size":12}]],"editRelations":[],"list":["id","title","description","image"]}}	object		
47	plugin_content_manager_configuration_content_types::application::box.box	{"uid":"application::box.box","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"title","defaultSortBy":"number","defaultSortOrder":"ASC"},"metadatas":{"products":{"edit":{"label":"Produits","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Products","searchable":false,"sortable":false}},"available":{"edit":{"label":"Disponible","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Available","searchable":true,"sortable":true}},"number":{"edit":{"label":"Numéro","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Numéro","searchable":true,"sortable":true}},"created_at":{"edit":{"label":"Created_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Created_at","searchable":true,"sortable":true}},"environnement":{"edit":{"label":"Environnement","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"Environnement","searchable":true,"sortable":true}},"stock":{"edit":{"label":"Quantité disponible","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Quantité disponible","searchable":true,"sortable":true}},"updated_at":{"edit":{"label":"Updated_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Updated_at","searchable":true,"sortable":true}},"title":{"edit":{"label":"Titre","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Titre","searchable":true,"sortable":true}},"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"image":{"edit":{"label":"Image","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Image","searchable":false,"sortable":false}},"description":{"edit":{"label":"Description","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Description","searchable":true,"sortable":true}}},"layouts":{"edit":[[{"name":"number","size":4},{"name":"title","size":6}],[{"name":"stock","size":4}],[{"name":"available","size":4}],[{"name":"image","size":6},{"name":"description","size":6}],[{"name":"products","size":12}]],"editRelations":["environnement"],"list":["number","title","image","stock"]}}	object		
65	plugin_content_manager_configuration_content_types::application::reponse.reponse	{"uid":"application::reponse.reponse","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"user_id","defaultSortBy":"user_id","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"user_id":{"edit":{"label":"ID utilisateur","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Id Utilisateur","searchable":true,"sortable":true}},"question":{"edit":{"label":"Question","description":"","placeholder":"","visible":true,"editable":true,"mainField":"text_question"},"list":{"label":"Question","searchable":true,"sortable":true}},"quizz_iteration":{"edit":{"label":"Itération","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Itération","searchable":true,"sortable":true}},"response":{"edit":{"label":"Réponse","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Réponse","searchable":true,"sortable":true}},"created_at":{"edit":{"label":"Created_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Created_at","searchable":true,"sortable":true}},"updated_at":{"edit":{"label":"Updated_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Updated_at","searchable":true,"sortable":true}}},"layouts":{"edit":[[{"name":"user_id","size":6},{"name":"quizz_iteration","size":4}],[{"name":"response","size":6}]],"editRelations":["question"],"list":["id","user_id","question","quizz_iteration","response"]}}	object		
62	plugin_content_manager_configuration_content_types::application::commande.commande	{"uid":"application::commande.commande","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"first_name","defaultSortBy":"created_at","defaultSortOrder":"DESC"},"metadatas":{"address_more":{"edit":{"label":"Complément d'adresse","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Address_more","searchable":true,"sortable":true}},"poi_name":{"edit":{"label":"Nom du POI","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Poi_name","searchable":true,"sortable":true}},"address_zipcode":{"edit":{"label":"Code postal","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Address_zipcode","searchable":true,"sortable":true}},"created_at":{"edit":{"label":"Created_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Date","searchable":true,"sortable":true}},"referent":{"edit":{"label":"Referent","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"Referent","searchable":true,"sortable":true}},"name":{"edit":{"label":"Libellé de l'envoi","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Nom (jeune ou POI)","searchable":true,"sortable":true}},"phone":{"edit":{"label":"Téléphone","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Phone","searchable":true,"sortable":true}},"address_dept":{"edit":{"label":"Département","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Address_dept","searchable":true,"sortable":true}},"last_name":{"edit":{"label":"Nom","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Nom","searchable":true,"sortable":true}},"delivery":{"edit":{"label":"Type de livraison","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Type de livraison","searchable":true,"sortable":true}},"address":{"edit":{"label":"Adresse","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Address","searchable":true,"sortable":true}},"address_city":{"edit":{"label":"Ville","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Address_city","searchable":true,"sortable":true}},"updated_at":{"edit":{"label":"Updated_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Updated_at","searchable":true,"sortable":true}},"sent":{"edit":{"label":"Envoyée","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Envoyée","searchable":true,"sortable":true}},"content":{"edit":{"label":"Contenu de la commande","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Content","searchable":false,"sortable":false}},"first_name":{"edit":{"label":"Prénom","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Prénom","searchable":true,"sortable":true}},"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"email":{"edit":{"label":"Email","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Email","searchable":true,"sortable":true}},"address_deptcode":{"edit":{"label":"Numéro département","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Address_deptcode","searchable":true,"sortable":true}},"poi_number":{"edit":{"label":"Numéro du POI","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Poi_number","searchable":true,"sortable":true}},"address_region":{"edit":{"label":"Région","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Address_region","searchable":true,"sortable":true}}},"layouts":{"edit":[[{"name":"sent","size":4}],[{"name":"last_name","size":6},{"name":"first_name","size":6}],[{"name":"email","size":6},{"name":"delivery","size":6}],[{"name":"name","size":6}],[{"name":"address","size":6},{"name":"address_more","size":6}],[{"name":"address_zipcode","size":6},{"name":"address_city","size":6}],[{"name":"address_dept","size":6},{"name":"address_deptcode","size":6}],[{"name":"address_region","size":6}],[{"name":"poi_name","size":6},{"name":"poi_number","size":6}],[{"name":"phone","size":6}],[{"name":"content","size":12}]],"editRelations":["referent"],"list":["id","created_at","last_name","first_name","email","delivery","sent"]}}	object		
55	model_def_commandes.box	{"uid":"commandes.box","collectionName":"components_commandes_boxes","info":{"name":"Box","icon":"dice-d6"},"options":{"timestamps":false},"attributes":{"box":{"model":"box"}}}	object	\N	\N
57	model_def_commandes.box-sur-mesure-produit	{"uid":"commandes.box-sur-mesure-produit","collectionName":"components_commandes_box_sur_mesure_produits","info":{"name":"BoxSurMesureProduit","icon":"apple-alt","description":""},"options":{"timestamps":false},"attributes":{"produit":{"model":"produit"},"quantity":{"type":"integer"}}}	object	\N	\N
59	model_def_commandes.box-sur-mesure	{"uid":"commandes.box-sur-mesure","collectionName":"components_commandes_box_sur_mesures","info":{"name":"Box sur mesure","icon":"boxes","description":""},"options":{"timestamps":false},"attributes":{"produits":{"type":"component","repeatable":true,"component":"commandes.box-sur-mesure-produit"}}}	object	\N	\N
45	model_def_application::produit.produit	{"uid":"application::produit.produit","collectionName":"produits","kind":"collectionType","info":{"name":"Produit","description":""},"options":{"increments":true,"timestamps":["created_at","updated_at"],"draftAndPublish":false},"pluginOptions":{},"attributes":{"title":{"type":"string","required":true},"description":{"type":"text"},"image":{"model":"file","via":"related","allowedTypes":["images","files","videos"],"plugin":"upload","required":false,"pluginOptions":{}},"created_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true},"updated_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true}}}	object	\N	\N
3	model_def_application::environnement.environnement	{"uid":"application::environnement.environnement","collectionName":"environnements","kind":"collectionType","info":{"name":"Zone","description":""},"options":{"increments":true,"timestamps":["created_at","updated_at"],"draftAndPublish":false},"pluginOptions":{},"attributes":{"name":{"type":"string"},"slug":{"type":"string"},"created_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true},"updated_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true}}}	object	\N	\N
5	model_def_application::thematique.thematique	{"uid":"application::thematique.thematique","collectionName":"themes","kind":"collectionType","info":{"name":"Thematique","description":""},"options":{"increments":true,"timestamps":["created_at","updated_at"],"draftAndPublish":true},"pluginOptions":{},"attributes":{"title":{"type":"string"},"image":{"collection":"file","via":"related","allowedTypes":["images"],"plugin":"upload","required":false,"pluginOptions":{}},"environnement":{"model":"environnement"},"display_quiz":{"type":"boolean","default":true,"required":true},"title_backoffice":{"type":"string"},"sound":{"model":"file","via":"related","allowedTypes":["files"],"plugin":"upload","required":false,"pluginOptions":{}},"published_at":{"type":"datetime","configurable":false,"writable":true,"visible":false},"created_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true},"updated_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true}}}	object	\N	\N
8	model_def_strapi::role	{"uid":"strapi::role","collectionName":"strapi_role","kind":"collectionType","info":{"name":"Role","description":""},"options":{"timestamps":["created_at","updated_at"]},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","minLength":1,"unique":true,"configurable":false,"required":true},"code":{"type":"string","minLength":1,"unique":true,"configurable":false,"required":true},"description":{"type":"string","configurable":false},"users":{"configurable":false,"collection":"user","via":"roles","plugin":"admin","attribute":"user","column":"id","isVirtual":true},"permissions":{"configurable":false,"plugin":"admin","collection":"permission","via":"role","isVirtual":true}}}	object	\N	\N
44	model_def_application::box.box	{"uid":"application::box.box","collectionName":"box","kind":"collectionType","info":{"name":"Box","description":""},"options":{"increments":true,"timestamps":["created_at","updated_at"],"draftAndPublish":true},"pluginOptions":{},"attributes":{"title":{"type":"string"},"image":{"model":"file","via":"related","allowedTypes":["images","files","videos"],"plugin":"upload","required":false,"pluginOptions":{}},"products":{"type":"component","repeatable":true,"component":"stocks.box-produit"},"stock":{"type":"biginteger","required":true,"default":"0"},"environnement":{"model":"environnement"},"description":{"type":"text"},"available":{"type":"boolean","default":true,"required":true},"number":{"type":"integer","unique":true},"published_at":{"type":"datetime","configurable":false,"writable":true,"visible":false},"created_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true},"updated_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true}}}	object	\N	\N
39	model_def_application::contact.contact	{"uid":"application::contact.contact","collectionName":"contact","kind":"collectionType","info":{"name":"Contact","description":""},"options":{"increments":true,"timestamps":["created_at","updated_at"],"draftAndPublish":false},"pluginOptions":{},"attributes":{"name":{"type":"string","required":false},"email":{"type":"email"},"zipcode":{"type":"integer"},"box":{"model":"box"},"zone":{"model":"environnement"},"type":{"type":"string"},"created_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true},"updated_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true}}}	object	\N	\N
1	model_def_strapi::core-store	{"uid":"strapi::core-store","collectionName":"core_store","info":{"name":"core_store","description":""},"options":{"timestamps":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"key":{"type":"string"},"value":{"type":"text"},"type":{"type":"string"},"environment":{"type":"string"},"tag":{"type":"string"}}}	object	\N	\N
33	model_def_contenus.reponses-textes	{"uid":"contenus.reponses-textes","collectionName":"responses","info":{"name":"responses","icon":"eye-dropper","description":""},"options":{"timestamps":false},"attributes":{"response_A":{"type":"string","default":"Oui","required":true},"response_B":{"type":"string","default":"Non","required":true},"response_C":{"type":"string","default":"Je ne sais pas","required":true},"response_A_neutral":{"type":"boolean","default":false,"required":true},"response_B_neutral":{"type":"boolean","default":false,"required":true},"response_C_neutral":{"type":"boolean","default":true,"required":true},"right_answer":{"type":"enumeration","enum":["A","B","C"],"required":true}}}	object	\N	\N
43	model_def_stocks.box-produit	{"uid":"stocks.box-produit","collectionName":"components_stocks_box_produits","info":{"name":"BoxProduit","icon":"archive","description":""},"options":{"timestamps":false},"attributes":{"quantity":{"type":"integer","required":true},"produit":{"model":"produit"}}}	object	\N	\N
66	model_def_application::referent.referent	{"uid":"application::referent.referent","collectionName":"referents","kind":"collectionType","info":{"name":"Referent","description":""},"options":{"increments":true,"timestamps":["created_at","updated_at"],"draftAndPublish":true},"pluginOptions":{},"attributes":{"name":{"type":"string"},"email":{"type":"email"},"environnement":{"model":"environnement"},"address":{"type":"string"},"address_zipcode":{"type":"string"},"address_city":{"type":"string"},"phone_number":{"type":"string"},"latitude":{"type":"float"},"longitude":{"type":"float"},"users":{"plugin":"admin","collection":"user","attribute":"user","column":"id","isVirtual":true},"openingHours":{"type":"component","repeatable":false,"component":"referents.opening-hours"},"published_at":{"type":"datetime","configurable":false,"writable":true,"visible":false},"created_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true},"updated_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true}}}	object	\N	\N
67	plugin_content_manager_configuration_content_types::application::referent.referent	{"uid":"application::referent.referent","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"address_zipcode":{"edit":{"label":"Code postal","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Address_zipcode","searchable":true,"sortable":true}},"users":{"edit":{"label":"Users","description":"","placeholder":"","visible":true,"editable":true,"mainField":"firstname"},"list":{"label":"Users","searchable":false,"sortable":false}},"created_at":{"edit":{"label":"Created_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Created_at","searchable":true,"sortable":true}},"environnement":{"edit":{"label":"Environnement","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"Zone","searchable":true,"sortable":true}},"name":{"edit":{"label":"Nom","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Nom","searchable":true,"sortable":true}},"latitude":{"edit":{"label":"Latitude","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Latitude","searchable":true,"sortable":true}},"longitude":{"edit":{"label":"Longitude","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Longitude","searchable":true,"sortable":true}},"address":{"edit":{"label":"Adresse","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Address","searchable":true,"sortable":true}},"address_city":{"edit":{"label":"Ville","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Address_city","searchable":true,"sortable":true}},"openingHours":{"edit":{"label":"OpeningHours","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"OpeningHours","searchable":false,"sortable":false}},"updated_at":{"edit":{"label":"Updated_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Updated_at","searchable":true,"sortable":true}},"phone_number":{"edit":{"label":"Téléphone","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Téléphone","searchable":true,"sortable":true}},"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"email":{"edit":{"label":"Email","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Téléphone","searchable":true,"sortable":true}}},"layouts":{"edit":[[{"name":"name","size":6},{"name":"email","size":6}],[{"name":"address","size":6},{"name":"address_zipcode","size":6}],[{"name":"address_city","size":6},{"name":"phone_number","size":6}],[{"name":"latitude","size":4},{"name":"longitude","size":4}],[{"name":"openingHours","size":12}]],"editRelations":["users","environnement"],"list":["name","phone_number","users","environnement"]}}	object		
19	plugin_content_manager_configuration_content_types::application::thematique.thematique	{"uid":"application::thematique.thematique","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"title","defaultSortBy":"id","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"title":{"edit":{"label":"Nom de la thématique","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Titre","searchable":true,"sortable":true}},"image":{"edit":{"label":"Image","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Image","searchable":false,"sortable":false}},"environnement":{"edit":{"label":"Thème disponible pour","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"Disponible pour","searchable":true,"sortable":true}},"display_quiz":{"edit":{"label":"Afficher le quiz","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Afficher le quiz","searchable":true,"sortable":true}},"title_backoffice":{"edit":{"label":"Titre backoffice","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Titre (BO)","searchable":true,"sortable":true}},"sound":{"edit":{"label":"Sound","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Sound","searchable":false,"sortable":false}},"created_at":{"edit":{"label":"Created_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Created_at","searchable":true,"sortable":true}},"updated_at":{"edit":{"label":"Updated_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Updated_at","searchable":true,"sortable":true}}},"layouts":{"list":["title_backoffice","image","environnement","display_quiz"],"edit":[[{"name":"title_backoffice","size":6},{"name":"title","size":6}],[{"name":"image","size":6},{"name":"display_quiz","size":4}],[{"name":"sound","size":6}]],"editRelations":["environnement"]}}	object		
49	model_def_application::parametres.parametres	{"uid":"application::parametres.parametres","collectionName":"settings","kind":"singleType","info":{"name":"Paramètres"},"options":{"increments":true,"timestamps":["created_at","updated_at"],"draftAndPublish":false},"pluginOptions":{},"attributes":{"nb_points_wrong_answer":{"type":"integer","default":25,"required":true},"nb_points_neutral_answer":{"type":"integer","default":30,"required":true},"nb_points_right_answer":{"type":"integer","default":100,"required":true},"created_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true},"updated_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true}}}	object	\N	\N
10	model_def_plugins::i18n.locale	{"uid":"plugins::i18n.locale","collectionName":"i18n_locales","kind":"collectionType","info":{"name":"locale","description":""},"options":{"timestamps":["created_at","updated_at"]},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","min":1,"max":50,"configurable":false},"code":{"type":"string","unique":true,"configurable":false},"created_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true},"updated_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true}}}	object	\N	\N
51	model_def_stocks.box-produit-sur-mesure	{"uid":"stocks.box-produit-sur-mesure","collectionName":"components_stocks_box_produit_sur_mesures","info":{"name":"BoxProduitSurMesure","icon":"box-open"},"options":{"timestamps":false},"attributes":{"stock":{"type":"biginteger"},"produit":{"model":"produit"}}}	object	\N	\N
2	model_def_application::content.content	{"uid":"application::content.content","collectionName":"contents","kind":"collectionType","info":{"name":"Contenu","description":""},"options":{"increments":true,"timestamps":["created_at","updated_at"],"draftAndPublish":true},"pluginOptions":{},"attributes":{"title":{"type":"string"},"text":{"type":"richtext"},"image":{"model":"file","via":"related","allowedTypes":["images"],"plugin":"upload","required":false,"pluginOptions":{}},"sound":{"model":"file","via":"related","allowedTypes":["files"],"plugin":"upload","required":false,"pluginOptions":{}},"theme":{"model":"thematique"},"published_at":{"type":"datetime","configurable":false,"writable":true,"visible":false},"created_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true},"updated_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true}}}	object	\N	\N
69	model_def_referents.time-table	{"uid":"referents.time-table","collectionName":"components_referents_time_tables","info":{"name":"Time Table","icon":"calendar-alt","description":""},"options":{"timestamps":false},"attributes":{"day":{"type":"string"},"openingHours":{"type":"component","repeatable":true,"component":"referents.opening-hours"}}}	object	\N	\N
40	plugin_content_manager_configuration_content_types::application::contact.contact	{"uid":"application::contact.contact","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"created_at":{"edit":{"label":"Created_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Created_at","searchable":true,"sortable":true}},"box":{"edit":{"label":"Box","description":"","placeholder":"","visible":true,"editable":true,"mainField":"title"},"list":{"label":"Box","searchable":true,"sortable":true}},"name":{"edit":{"label":"Nom","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Nom","searchable":true,"sortable":true}},"zone":{"edit":{"label":"Zone","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"Zone","searchable":true,"sortable":true}},"zipcode":{"edit":{"label":"Code postal","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Code postal","searchable":true,"sortable":true}},"updated_at":{"edit":{"label":"Updated_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Updated_at","searchable":true,"sortable":true}},"type":{"edit":{"label":"Type","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Type","searchable":true,"sortable":true}},"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"email":{"edit":{"label":"Email","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Email","searchable":true,"sortable":true}}},"layouts":{"edit":[[{"name":"name","size":6},{"name":"email","size":6}],[{"name":"zipcode","size":4},{"name":"type","size":6}]],"editRelations":["box","zone"],"list":["name","email","zipcode","type"]}}	object		
68	model_def_referents.opening-hours	{"uid":"referents.opening-hours","collectionName":"components_referents_opening_hours","info":{"name":"OpeningHours","icon":"clock","description":""},"options":{"timestamps":false},"attributes":{"monday_title":{"type":"string","default":"Lundi"},"monday_value":{"type":"string","default":"09h00 - 17h00"},"tuesday_title":{"type":"string","default":"Mardi"},"tuesday_value":{"type":"string","default":"09h00 - 17h00"},"wednesday_title":{"type":"string","default":"Mercredi"},"wednesday_value":{"type":"string","default":"09h00 - 17h00"},"thursday_title":{"type":"string","default":"Jeudi"},"thursday_value":{"type":"string","default":"09h00 - 17h00"},"friday_title":{"type":"string","default":"Vendredi"},"friday_value":{"type":"string","default":"09h00 - 17h00"},"saturday_title":{"type":"string","default":"Samedi"},"saturday_value":{"type":"string","default":"09h00 - 17h00"},"sunday_title":{"type":"string","default":"Dimanche"},"sunday_value":{"type":"string","default":"09h00 - 17h00"}}}	object	\N	\N
61	model_def_application::commande.commande	{"uid":"application::commande.commande","collectionName":"order","kind":"collectionType","info":{"name":"Commande","description":""},"options":{"increments":true,"timestamps":["created_at","updated_at"],"draftAndPublish":false},"pluginOptions":{},"attributes":{"first_name":{"type":"string"},"last_name":{"type":"string"},"email":{"type":"email"},"delivery":{"type":"enumeration","enum":["home","pickup","referent"]},"content":{"type":"dynamiczone","components":["commandes.box-sur-mesure","commandes.box"],"max":1,"min":1,"required":true},"address":{"type":"string","required":true},"address_dept":{"type":"string"},"address_region":{"type":"string"},"address_zipcode":{"type":"string"},"poi_name":{"type":"string"},"name":{"type":"string"},"address_deptcode":{"type":"string"},"phone":{"type":"string"},"address_city":{"type":"string","private":false},"address_more":{"type":"string"},"poi_number":{"type":"string"},"referent":{"model":"referent"},"sent":{"type":"boolean","default":false,"private":false},"created_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true},"updated_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true}}}	object	\N	\N
4	model_def_application::question.question	{"uid":"application::question.question","collectionName":"questions","kind":"collectionType","info":{"name":"Question","description":""},"options":{"increments":true,"timestamps":["created_at","updated_at"],"draftAndPublish":true},"pluginOptions":{},"attributes":{"text_question":{"type":"string","required":true},"text_answer":{"type":"text","required":true},"image":{"model":"file","via":"related","allowedTypes":["images"],"plugin":"upload","required":false,"pluginOptions":{}},"responses":{"type":"component","repeatable":false,"component":"contenus.reponses-textes","required":true},"theme":{"model":"thematique"},"sound_question":{"model":"file","via":"related","allowedTypes":["files"],"plugin":"upload","required":false,"pluginOptions":{}},"sound_answer":{"model":"file","via":"related","allowedTypes":["files"],"plugin":"upload","required":false,"pluginOptions":{}},"published_at":{"type":"datetime","configurable":false,"writable":true,"visible":false},"created_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true},"updated_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true}}}	object	\N	\N
72	model_def_referents.opening	{"uid":"referents.opening","collectionName":"components_referents_openings","info":{"name":"Opening","icon":"grip-vertical"},"options":{"timestamps":false},"attributes":{"monday_title":{"type":"string","default":"Lundi"},"monday_value":{"type":"string","default":"09H00-17H00"}}}	object	\N	\N
9	model_def_strapi::user	{"uid":"strapi::user","collectionName":"strapi_administrator","kind":"collectionType","info":{"name":"User","description":""},"options":{"timestamps":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"firstname":{"type":"string","unique":false,"minLength":1,"configurable":false,"required":false},"lastname":{"type":"string","unique":false,"minLength":1,"configurable":false,"required":false},"username":{"type":"string","unique":false,"configurable":false,"required":false},"email":{"type":"email","minLength":6,"configurable":false,"required":true,"unique":true,"private":true},"password":{"type":"password","minLength":6,"configurable":false,"required":false,"private":true},"resetPasswordToken":{"type":"string","configurable":false,"private":true},"registrationToken":{"type":"string","configurable":false,"private":true},"isActive":{"type":"boolean","default":false,"configurable":false,"private":true},"roles":{"collection":"role","collectionName":"strapi_users_roles","via":"users","dominant":true,"plugin":"admin","configurable":false,"private":true,"attribute":"role","column":"id","isVirtual":true},"blocked":{"type":"boolean","default":false,"configurable":false,"private":true},"preferedLanguage":{"type":"string","configurable":false,"required":false}}}	object	\N	\N
11	model_def_plugins::upload.file	{"uid":"plugins::upload.file","collectionName":"upload_file","kind":"collectionType","info":{"name":"file","description":""},"options":{"timestamps":["created_at","updated_at"]},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","configurable":false,"required":true},"alternativeText":{"type":"string","configurable":false},"caption":{"type":"string","configurable":false},"width":{"type":"integer","configurable":false},"height":{"type":"integer","configurable":false},"formats":{"type":"json","configurable":false},"hash":{"type":"string","configurable":false,"required":true},"ext":{"type":"string","configurable":false},"mime":{"type":"string","configurable":false,"required":true},"size":{"type":"decimal","configurable":false,"required":true},"url":{"type":"string","configurable":false,"required":true},"previewUrl":{"type":"string","configurable":false},"provider":{"type":"string","configurable":false,"required":true},"provider_metadata":{"type":"json","configurable":false},"related":{"collection":"*","filter":"field","configurable":false},"created_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true},"updated_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"visible":false,"private":true}}}	object	\N	\N
\.


--
-- Data for Name: environnements; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.environnements (id, title, slug, thematique, created_by, updated_by, created_at, updated_at, role, "user", name) FROM stdin;
2	Guyane	guyane	\N	1	1	2021-05-18 11:36:14.379+02	2021-05-18 15:32:23.266+02	\N	\N	Guyane
1	Métropole	metropole	\N	1	1	2021-05-18 11:35:32.333+02	2021-05-18 15:32:31.425+02	\N	1	Métropole
\.


--
-- Data for Name: i18n_locales; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.i18n_locales (id, name, code, created_by, updated_by, created_at, updated_at) FROM stdin;
1	English (en)	en	\N	\N	2021-05-17 17:25:38.838+02	2021-05-17 17:25:38.838+02
2	French (fr)	fr	1	1	2021-05-24 16:28:29.36+02	2021-05-24 16:28:35.018+02
\.


--
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public."order" (id, first_name, last_name, email, delivery, created_by, updated_by, created_at, updated_at, address, address_deptcode, address_dept, address_region, address_zipcode, poi_name, name, phone, address_city, address_more, poi_number, referent, sent) FROM stdin;
\.


--
-- Data for Name: order_components; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.order_components (id, field, "order", component_type, component_id, order_id) FROM stdin;
\.


--
-- Data for Name: produits; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.produits (id, title, description, quantity, created_by, updated_by, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.questions (id, text_question, text_answer, right_answer, "thematiqueId", published_at, created_by, updated_by, created_at, updated_at, thematique, theme) FROM stdin;
\.


--
-- Data for Name: questions_components; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.questions_components (id, field, "order", component_type, component_id, question_id) FROM stdin;
\.


--
-- Data for Name: referents; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.referents (id, name, email, zone, address, address_zipcode, address_city, phone_number, latitude, longitude, published_at, created_by, updated_by, created_at, updated_at, environnement) FROM stdin;
\.


--
-- Data for Name: referents__users; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.referents__users (id, referent_id, user_id) FROM stdin;
\.


--
-- Data for Name: referents_components; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.referents_components (id, field, "order", component_type, component_id, referent_id) FROM stdin;
\.


--
-- Data for Name: reponses; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.reponses (id, user_id, question, quizz_iteration, response, published_at, created_by, updated_by, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: responses; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.responses (id, "response_A", "response_B", "response_C", "response_A_neutral", "response_B_neutral", "response_C_neutral", right_answer) FROM stdin;
1	Oui	Non	Je ne sais pas	f	f	t	A
\.


--
-- Data for Name: settings; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.settings (id, nb_points_wrong_answer, nb_points_neutral_answer, nb_points_right_answer, created_by, updated_by, created_at, updated_at) FROM stdin;
2	25	30	100	4	1	2021-06-09 14:42:38.665+02	2021-07-01 17:47:25.994+02
\.


--
-- Data for Name: strapi_administrator; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.strapi_administrator (id, firstname, lastname, username, email, password, "resetPasswordToken", "registrationToken", "isActive", blocked, "preferedLanguage") FROM stdin;
3	Métropole	Coordinateur	Coordinateur Métropole	coordinateur@metropole.loc	$2a$10$nN8T1LYXIsUoNvWD0B/pieyn6zdnWhD6tEveIBW9eeqPuVI3Kc42.	\N	\N	t	\N	\N
5	Guyane	Coordinateur	Coordinateur Guyane	coordinateur@guyane.loc	$2a$10$kUhA7f7ByzNv9xrSDPcEiO/Z0ykIHUVaZRnffZ1b1zhAE4eUV86vK	\N	\N	t	\N	\N
1	Clément	Lelong	Clément Lelong	clement@numericite.eu	$2a$10$wx9S1ocwF1hl.ytF8l5UT..AEuvuOizxtXPl0SEZpdATpvl8Bxjcm	\N	\N	t	\N	\N
4	Brian	Ridolce	Brian Ridolce	brianridolcedev@gmail.com	$2a$10$xXuu5v9Kr86hWxGOq5NK0egQrqK2iCPDCNub96mipvVd3nz5w0Ni2	\N	\N	t	\N	\N
6	Admin	Tumeplay	Admin Tumeplay	admin@tumeplay.com	$2a$10$TeEp0n7ofkM291hqm6sUnuiDe/hg/2MvPHolb7PqNVPMiFgEhquji	\N	\N	t	\N	\N
8	Pilote	Guyane	Pilote Guyane	pilote@guyane.loc	$2a$10$XtQC1Ee/3GrDR3Pf9edpy.HGGwGU4tjHFy1qj.fmPyIp/sCz7vH0W	\N	\N	t	\N	\N
7	Référent	Guyane	Référent Guyane	referent@guyane.loc	$2a$10$u4DpU1yUfOuay5B8V0hh2eWVuVaTgnFbLu/ZcJCEzJkbaHb0C8xcO	\N	\N	t	\N	\N
\.


--
-- Data for Name: strapi_permission; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.strapi_permission (id, action, subject, properties, conditions, role, created_at, updated_at) FROM stdin;
8877	plugins::content-manager.explorer.create	application::box.box	{"fields": ["title", "image", "products.quantity", "products.produit", "stock", "environnement", "description", "available", "number"]}	["admin::simple-zone-guyane"]	6	2021-07-21 14:58:35.148+02	2021-07-21 14:58:35.158+02
365	plugins::content-manager.explorer.update	application::content.content	{"fields": ["title", "text", "image", "sound", "theme"]}	[]	1	2021-05-18 11:51:49.959+02	2021-05-18 11:51:49.979+02
1219	plugins::content-manager.explorer.update	application::environnement.environnement	{"fields": ["name", "slug"]}	[]	1	2021-05-18 15:32:49.845+02	2021-05-18 15:32:49.868+02
8011	plugins::content-manager.explorer.delete	application::produit.produit	{}	[]	\N	2021-07-19 11:15:00.621+02	2021-07-19 11:19:17.647+02
8352	admin::users.create	\N	{}	[]	6	2021-07-21 11:06:14.327+02	2021-07-21 11:06:14.344+02
8004	plugins::content-manager.explorer.delete	application::box.box	{}	[]	\N	2021-07-19 11:15:00.541+02	2021-07-19 11:19:17.648+02
8020	plugins::content-manager.explorer.publish	application::referent.referent	{}	[]	\N	2021-07-19 11:15:00.704+02	2021-07-19 11:19:17.662+02
8016	plugins::content-manager.explorer.publish	application::box.box	{}	[]	\N	2021-07-19 11:15:00.628+02	2021-07-19 11:19:17.662+02
8008	plugins::content-manager.explorer.delete	application::environnement.environnement	{}	[]	\N	2021-07-19 11:15:00.542+02	2021-07-19 11:19:17.662+02
8010	plugins::content-manager.explorer.delete	application::parametres.parametres	{}	[]	\N	2021-07-19 11:15:00.621+02	2021-07-19 11:19:17.662+02
8630	plugins::content-manager.explorer.read	application::question.question	{"fields": ["text_question", "text_answer", "image", "responses.response_A", "responses.response_B", "responses.response_C", "responses.response_A_neutral", "responses.response_B_neutral", "responses.response_C_neutral", "responses.right_answer", "theme", "sound_question", "sound_answer"]}	["admin::theme-zone-guyane"]	6	2021-07-21 12:30:10.745+02	2021-07-21 12:30:10.756+02
43	plugins::upload.assets.create	\N	{}	[]	3	2021-05-17 17:25:41.682+02	2021-05-17 17:25:41.711+02
8654	plugins::content-manager.explorer.create	application::commande.commande	{"fields": ["first_name", "last_name", "email", "delivery", "content", "address", "address_dept", "address_region", "address_zipcode", "poi_name", "name", "address_deptcode", "phone", "address_city", "address_more", "poi_number", "referent", "sent"]}	["admin::order-zone-guyane"]	6	2021-07-21 12:32:47.689+02	2021-07-21 12:32:47.697+02
81	plugins::content-manager.components.configure-layout	\N	{}	[]	1	2021-05-17 17:25:42.088+02	2021-05-17 17:25:42.123+02
103	admin::webhooks.delete	\N	{}	[]	1	2021-05-17 17:25:42.259+02	2021-05-17 17:25:42.286+02
76	plugins::upload.assets.download	\N	{}	[]	1	2021-05-17 17:25:42.023+02	2021-05-17 17:25:42.054+02
85	plugins::i18n.locale.delete	\N	{}	[]	1	2021-05-17 17:25:42.108+02	2021-05-17 17:25:42.137+02
96	admin::marketplace.read	\N	{}	[]	1	2021-05-17 17:25:42.198+02	2021-05-17 17:25:42.229+02
106	admin::users.delete	\N	{}	[]	1	2021-05-17 17:25:42.287+02	2021-05-17 17:25:42.317+02
44	plugins::upload.assets.update	\N	{}	["admin::is-creator"]	3	2021-05-17 17:25:41.688+02	2021-05-17 17:25:41.717+02
71	plugins::content-type-builder.read	\N	{}	[]	1	2021-05-17 17:25:42.001+02	2021-05-17 17:25:42.041+02
83	plugins::i18n.locale.read	\N	{}	[]	1	2021-05-17 17:25:42.093+02	2021-05-17 17:25:42.123+02
98	admin::marketplace.plugins.install	\N	{}	[]	1	2021-05-17 17:25:42.246+02	2021-05-17 17:25:42.271+02
107	admin::roles.create	\N	{}	[]	1	2021-05-17 17:25:42.322+02	2021-05-17 17:25:42.338+02
45	plugins::upload.assets.download	\N	{}	[]	3	2021-05-17 17:25:41.691+02	2021-05-17 17:25:41.717+02
4047	plugins::content-manager.explorer.update	application::reponse.reponse	{"fields": ["user_id", "question", "quizz_iteration", "response"]}	[]	1	2021-06-24 18:38:34.16+02	2021-06-24 18:38:34.176+02
4048	plugins::content-manager.explorer.read	application::reponse.reponse	{"fields": ["user_id", "question", "quizz_iteration", "response"]}	[]	1	2021-06-24 18:38:34.159+02	2021-06-24 18:38:34.183+02
82	plugins::i18n.locale.create	\N	{}	[]	1	2021-05-17 17:25:42.088+02	2021-05-17 17:25:42.124+02
102	admin::users.create	\N	{}	[]	1	2021-05-17 17:25:42.259+02	2021-05-17 17:25:42.286+02
46	plugins::upload.assets.copy-link	\N	{}	[]	3	2021-05-17 17:25:41.744+02	2021-05-17 17:25:41.752+02
72	plugins::email.settings.read	\N	{}	[]	1	2021-05-17 17:25:42.006+02	2021-05-17 17:25:42.04+02
79	plugins::content-manager.single-types.configure-view	\N	{}	[]	1	2021-05-17 17:25:42.088+02	2021-05-17 17:25:42.114+02
97	admin::marketplace.plugins.uninstall	\N	{}	[]	1	2021-05-17 17:25:42.247+02	2021-05-17 17:25:42.27+02
108	admin::roles.read	\N	{}	[]	1	2021-05-17 17:25:42.323+02	2021-05-17 17:25:42.343+02
8000	plugins::content-manager.explorer.create	application::referent.referent	{"fields": ["name", "email", "address", "address_zipcode", "address_city", "phone_number", "latitude", "longitude", "users"]}	[]	\N	2021-07-19 11:15:00.539+02	2021-07-21 11:15:34.424+02
8592	plugins::content-manager.explorer.delete	application::question.question	{}	["admin::theme-zone-guyane"]	4	2021-07-21 12:26:03.746+02	2021-07-21 12:26:03.772+02
8598	plugins::content-manager.explorer.create	application::question.question	{"fields": ["text_question", "text_answer", "image", "responses.response_A", "responses.response_B", "responses.response_C", "responses.response_A_neutral", "responses.response_B_neutral", "responses.response_C_neutral", "responses.right_answer", "theme"]}	["admin::theme-zone-metropole"]	3	2021-07-21 12:26:39.547+02	2021-07-21 12:26:39.569+02
2502	plugins::content-manager.explorer.read	application::produit.produit	{"fields": ["title", "description", "image"]}	[]	1	2021-06-07 15:14:54.798+02	2021-06-07 15:14:54.821+02
8005	plugins::content-manager.explorer.delete	application::commande.commande	{}	[]	\N	2021-07-19 11:15:00.541+02	2021-07-19 11:19:17.648+02
73	plugins::upload.read	\N	{}	[]	1	2021-05-17 17:25:42.007+02	2021-05-17 17:25:42.041+02
80	plugins::content-manager.collection-types.configure-view	\N	{}	[]	1	2021-05-17 17:25:42.088+02	2021-05-17 17:25:42.114+02
101	admin::webhooks.update	\N	{}	[]	1	2021-05-17 17:25:42.253+02	2021-05-17 17:25:42.279+02
75	plugins::upload.assets.update	\N	{}	[]	1	2021-05-17 17:25:42.022+02	2021-05-17 17:25:42.054+02
105	admin::users.update	\N	{}	[]	1	2021-05-17 17:25:42.279+02	2021-05-17 17:25:42.31+02
74	plugins::upload.assets.create	\N	{}	[]	1	2021-05-17 17:25:42.013+02	2021-05-17 17:25:42.048+02
84	plugins::i18n.locale.update	\N	{}	[]	1	2021-05-17 17:25:42.101+02	2021-05-17 17:25:42.13+02
104	admin::users.read	\N	{}	[]	1	2021-05-17 17:25:42.264+02	2021-05-17 17:25:42.295+02
1216	plugins::content-manager.explorer.create	application::environnement.environnement	{"fields": ["name", "slug"]}	[]	1	2021-05-18 15:32:49.845+02	2021-05-18 15:32:49.867+02
8878	plugins::content-manager.explorer.update	application::box.box	{"fields": ["title", "image", "products.quantity", "products.produit", "stock", "environnement", "description", "available", "number"]}	["admin::simple-zone-guyane"]	6	2021-07-21 14:58:35.148+02	2021-07-21 14:58:35.158+02
363	plugins::content-manager.explorer.read	application::content.content	{"fields": ["title", "text", "image", "sound", "theme"]}	[]	1	2021-05-18 11:51:49.959+02	2021-05-18 11:51:49.978+02
78	plugins::upload.settings.read	\N	{}	[]	1	2021-05-17 17:25:42.083+02	2021-05-17 17:25:42.115+02
99	admin::webhooks.create	\N	{}	[]	1	2021-05-17 17:25:42.247+02	2021-05-17 17:25:42.271+02
109	admin::roles.update	\N	{}	[]	1	2021-05-17 17:25:42.326+02	2021-05-17 17:25:42.342+02
8009	plugins::content-manager.explorer.delete	application::feedback.feedback	{}	[]	\N	2021-07-19 11:15:00.542+02	2021-07-19 11:19:17.648+02
42	plugins::upload.read	\N	{}	["admin::is-creator"]	3	2021-05-17 17:25:41.681+02	2021-05-17 17:25:41.711+02
77	plugins::upload.assets.copy-link	\N	{}	[]	1	2021-05-17 17:25:42.082+02	2021-05-17 17:25:42.114+02
100	admin::webhooks.read	\N	{}	[]	1	2021-05-17 17:25:42.247+02	2021-05-17 17:25:42.271+02
110	admin::roles.delete	\N	{}	[]	1	2021-05-17 17:25:42.326+02	2021-05-17 17:25:42.342+02
364	plugins::content-manager.explorer.create	application::content.content	{"fields": ["title", "text", "image", "sound", "theme"]}	[]	1	2021-05-18 11:51:49.959+02	2021-05-18 11:51:49.978+02
1218	plugins::content-manager.explorer.read	application::environnement.environnement	{"fields": ["name", "slug"]}	[]	1	2021-05-18 15:32:49.845+02	2021-05-18 15:32:49.868+02
7770	plugins::content-manager.explorer.create	application::box.box	{"fields": ["title", "image", "products.quantity", "products.produit", "stock", "environnement", "description", "available", "number"]}	[]	1	2021-07-01 17:22:45.332+02	2021-07-01 17:22:45.351+02
8019	plugins::content-manager.explorer.publish	application::question.question	{}	[]	\N	2021-07-19 11:15:00.642+02	2021-07-19 11:19:17.662+02
8022	plugins::content-manager.explorer.publish	application::thematique.thematique	{}	[]	\N	2021-07-19 11:15:00.704+02	2021-07-19 11:19:17.662+02
8013	plugins::content-manager.explorer.delete	application::referent.referent	{}	[]	\N	2021-07-19 11:15:00.622+02	2021-07-19 11:19:17.663+02
4049	plugins::content-manager.explorer.create	application::reponse.reponse	{"fields": ["user_id", "question", "quizz_iteration", "response"]}	[]	1	2021-06-24 18:38:34.159+02	2021-06-24 18:38:34.183+02
8353	admin::users.update	\N	{}	[]	6	2021-07-21 11:06:14.331+02	2021-07-21 11:06:14.352+02
2503	plugins::content-manager.explorer.update	application::box-sur-mesure.box-sur-mesure	{"fields": ["title", "description", "image", "produits.stock", "produits.produit"]}	[]	1	2021-06-07 15:14:54.798+02	2021-06-07 15:14:54.821+02
8629	plugins::content-manager.explorer.create	application::question.question	{"fields": ["text_question", "text_answer", "image", "responses.response_A", "responses.response_B", "responses.response_C", "responses.response_A_neutral", "responses.response_B_neutral", "responses.response_C_neutral", "responses.right_answer", "theme", "sound_question", "sound_answer"]}	["admin::theme-zone-guyane"]	6	2021-07-21 12:30:10.745+02	2021-07-21 12:30:10.755+02
8631	plugins::content-manager.explorer.update	application::question.question	{"fields": ["text_question", "text_answer", "image", "responses.response_A", "responses.response_B", "responses.response_C", "responses.response_A_neutral", "responses.response_B_neutral", "responses.response_C_neutral", "responses.right_answer", "theme", "sound_question", "sound_answer"]}	["admin::theme-zone-guyane"]	6	2021-07-21 12:30:10.745+02	2021-07-21 12:30:10.758+02
8594	plugins::content-manager.explorer.create	application::content.content	{"fields": ["title", "text", "image", "sound", "theme"]}	["admin::theme-zone-metropole"]	3	2021-07-21 12:26:39.546+02	2021-07-21 12:26:39.568+02
8593	plugins::content-manager.explorer.publish	application::question.question	{}	["admin::theme-zone-guyane"]	4	2021-07-21 12:26:03.752+02	2021-07-21 12:26:03.771+02
7771	plugins::content-manager.explorer.read	application::box.box	{"fields": ["title", "image", "products.quantity", "products.produit", "stock", "environnement", "description", "available", "number"]}	[]	1	2021-07-01 17:22:45.332+02	2021-07-01 17:22:45.351+02
2497	plugins::content-manager.explorer.create	application::box-sur-mesure.box-sur-mesure	{"fields": ["title", "description", "image", "produits.stock", "produits.produit"]}	[]	1	2021-06-07 15:14:54.797+02	2021-06-07 15:14:54.82+02
2460	plugins::content-manager.explorer.create	application::parametres.parametres	{"fields": ["nb_points_wrong_answer", "nb_points_neutral_answer", "nb_points_right_answer"]}	[]	1	2021-06-07 12:23:07.816+02	2021-06-07 12:23:07.836+02
2461	plugins::content-manager.explorer.read	application::parametres.parametres	{"fields": ["nb_points_wrong_answer", "nb_points_neutral_answer", "nb_points_right_answer"]}	[]	1	2021-06-07 12:23:07.816+02	2021-06-07 12:23:07.836+02
2462	plugins::content-manager.explorer.update	application::parametres.parametres	{"fields": ["nb_points_wrong_answer", "nb_points_neutral_answer", "nb_points_right_answer"]}	[]	1	2021-06-07 12:23:07.816+02	2021-06-07 12:23:07.836+02
7872	plugins::content-manager.explorer.read	application::commande.commande	{"fields": ["first_name", "last_name", "email", "delivery", "content", "address", "address_dept", "address_region", "address_zipcode", "poi_name", "name", "address_deptcode", "phone", "address_city", "address_more", "poi_number", "referent", "sent"]}	[]	1	2021-07-13 11:54:58.426+02	2021-07-13 11:54:58.442+02
2779	plugins::content-manager.explorer.read	application::feedback.feedback	{"fields": ["title", "question", "body", "appreciation"]}	[]	1	2021-06-07 16:49:00.118+02	2021-06-07 16:49:00.136+02
2505	plugins::content-manager.explorer.update	application::produit.produit	{"fields": ["title", "description", "image"]}	[]	1	2021-06-07 15:14:54.799+02	2021-06-07 15:14:54.821+02
8006	plugins::content-manager.explorer.delete	application::contact.contact	{}	[]	\N	2021-07-19 11:15:00.541+02	2021-07-19 11:19:17.663+02
2780	plugins::content-manager.explorer.create	application::feedback.feedback	{"fields": ["title", "question", "body", "appreciation"]}	[]	1	2021-06-07 16:49:00.118+02	2021-06-07 16:49:00.136+02
7875	plugins::content-manager.explorer.update	application::commande.commande	{"fields": ["first_name", "last_name", "email", "delivery", "content", "address", "address_dept", "address_region", "address_zipcode", "poi_name", "name", "address_deptcode", "phone", "address_city", "address_more", "poi_number", "referent", "sent"]}	[]	1	2021-07-13 11:54:58.427+02	2021-07-13 11:54:58.443+02
8012	plugins::content-manager.explorer.delete	application::question.question	{}	[]	\N	2021-07-19 11:15:00.622+02	2021-07-19 11:19:17.663+02
8015	plugins::content-manager.explorer.delete	application::thematique.thematique	{}	[]	\N	2021-07-19 11:15:00.622+02	2021-07-19 11:19:17.663+02
2499	plugins::content-manager.explorer.create	application::produit.produit	{"fields": ["title", "description", "image"]}	[]	1	2021-06-07 15:14:54.798+02	2021-06-07 15:14:54.82+02
2781	plugins::content-manager.explorer.update	application::feedback.feedback	{"fields": ["title", "question", "body", "appreciation"]}	[]	1	2021-06-07 16:49:00.118+02	2021-06-07 16:49:00.136+02
2500	plugins::content-manager.explorer.read	application::box-sur-mesure.box-sur-mesure	{"fields": ["title", "description", "image", "produits.stock", "produits.produit"]}	[]	1	2021-06-07 15:14:54.798+02	2021-06-07 15:14:54.82+02
7772	plugins::content-manager.explorer.update	application::box.box	{"fields": ["title", "image", "products.quantity", "products.produit", "stock", "environnement", "description", "available", "number"]}	[]	1	2021-07-01 17:22:45.332+02	2021-07-01 17:22:45.351+02
8354	admin::users.delete	\N	{}	[]	6	2021-07-21 11:06:14.335+02	2021-07-21 11:06:14.356+02
8879	plugins::content-manager.explorer.delete	application::box.box	{}	["admin::simple-zone-guyane"]	6	2021-07-21 14:58:35.149+02	2021-07-21 14:58:35.16+02
8632	plugins::content-manager.explorer.publish	application::question.question	{}	["admin::theme-zone-guyane"]	6	2021-07-21 12:30:10.75+02	2021-07-21 12:30:10.758+02
8656	plugins::content-manager.explorer.update	application::commande.commande	{"fields": ["first_name", "last_name", "email", "delivery", "content", "address", "address_dept", "address_region", "address_zipcode", "poi_name", "name", "address_deptcode", "phone", "address_city", "address_more", "poi_number", "referent", "sent"]}	["admin::order-zone-guyane"]	6	2021-07-21 12:32:47.696+02	2021-07-21 12:32:47.705+02
8396	plugins::content-manager.explorer.publish	application::box-sur-mesure.box-sur-mesure	{}	[]	6	2021-07-21 11:06:14.581+02	2021-07-21 11:06:14.595+02
7792	plugins::content-manager.explorer.read	application::question.question	{"fields": ["text_question", "text_answer", "image", "responses.response_A", "responses.response_B", "responses.response_C", "responses.response_A_neutral", "responses.response_B_neutral", "responses.response_C_neutral", "responses.right_answer", "theme", "sound_question", "sound_answer"]}	[]	1	2021-07-13 11:23:53.129+02	2021-07-13 11:23:53.144+02
8595	plugins::content-manager.explorer.update	application::content.content	{"fields": ["title", "text", "image", "sound", "theme"]}	["admin::theme-zone-metropole"]	3	2021-07-21 12:26:39.546+02	2021-07-21 12:26:39.568+02
7871	plugins::content-manager.explorer.create	application::commande.commande	{"fields": ["first_name", "last_name", "email", "delivery", "content", "address", "address_dept", "address_region", "address_zipcode", "poi_name", "name", "address_deptcode", "phone", "address_city", "address_more", "poi_number", "referent", "sent"]}	[]	1	2021-07-13 11:54:58.426+02	2021-07-13 11:54:58.442+02
8880	plugins::content-manager.explorer.publish	application::box.box	{}	["admin::simple-zone-guyane"]	6	2021-07-21 14:58:35.15+02	2021-07-21 14:58:35.16+02
8596	plugins::content-manager.explorer.read	application::content.content	{"fields": ["title", "text", "image", "sound", "theme"]}	["admin::theme-zone-metropole"]	3	2021-07-21 12:26:39.546+02	2021-07-21 12:26:39.569+02
8633	plugins::content-manager.explorer.delete	application::question.question	{}	["admin::theme-zone-guyane"]	6	2021-07-21 12:30:10.75+02	2021-07-21 12:30:10.758+02
7793	plugins::content-manager.explorer.create	application::thematique.thematique	{"fields": ["title", "image", "environnement", "display_quiz", "title_backoffice", "sound"]}	[]	1	2021-07-13 11:23:53.129+02	2021-07-13 11:23:53.144+02
7796	plugins::content-manager.explorer.create	application::question.question	{"fields": ["text_question", "text_answer", "image", "responses.response_A", "responses.response_B", "responses.response_C", "responses.response_A_neutral", "responses.response_B_neutral", "responses.response_C_neutral", "responses.right_answer", "theme", "sound_question", "sound_answer"]}	[]	1	2021-07-13 11:23:53.13+02	2021-07-13 11:23:53.145+02
7800	plugins::content-manager.explorer.update	application::question.question	{"fields": ["text_question", "text_answer", "image", "responses.response_A", "responses.response_B", "responses.response_C", "responses.response_A_neutral", "responses.response_B_neutral", "responses.response_C_neutral", "responses.right_answer", "theme", "sound_question", "sound_answer"]}	[]	1	2021-07-13 11:23:53.134+02	2021-07-13 11:23:53.149+02
7799	plugins::content-manager.explorer.read	application::thematique.thematique	{"fields": ["title", "image", "environnement", "display_quiz", "title_backoffice", "sound"]}	[]	1	2021-07-13 11:23:53.134+02	2021-07-13 11:23:53.149+02
7823	plugins::content-manager.explorer.read	application::commande.commande	{"fields": ["first_name", "last_name", "email", "delivery", "content", "address", "address_dept", "address_region", "address_zipcode", "poi_name", "name", "address_deptcode", "phone", "address_city", "address_more", "poi_number", "referent"]}	[]	5	2021-07-13 11:27:15.139+02	2021-07-13 11:54:43.708+02
7824	plugins::content-manager.explorer.update	application::commande.commande	{"fields": ["first_name", "last_name", "email", "delivery", "content", "address", "address_dept", "address_region", "address_zipcode", "poi_name", "name", "address_deptcode", "phone", "address_city", "address_more", "poi_number", "referent"]}	[]	5	2021-07-13 11:27:15.14+02	2021-07-13 11:54:43.709+02
8657	plugins::content-manager.explorer.delete	application::commande.commande	{}	["admin::order-zone-guyane"]	6	2021-07-21 12:32:47.697+02	2021-07-21 12:32:47.708+02
7802	plugins::content-manager.explorer.update	application::thematique.thematique	{"fields": ["title", "image", "environnement", "display_quiz", "title_backoffice", "sound"]}	[]	1	2021-07-13 11:23:53.174+02	2021-07-13 11:23:53.195+02
8624	plugins::content-manager.explorer.create	application::content.content	{"fields": ["title", "text", "image", "sound", "theme"]}	["admin::theme-zone-guyane"]	6	2021-07-21 12:30:10.707+02	2021-07-21 12:30:10.722+02
8489	plugins::content-manager.explorer.create	application::referent.referent	{"fields": ["name", "email", "environnement", "address", "address_zipcode", "address_city", "phone_number", "latitude", "longitude", "users", "openingHours.monday_title", "openingHours.monday_value", "openingHours.tuesday_title", "openingHours.tuesday_value", "openingHours.wednesday_title", "openingHours.wednesday_value", "openingHours.thursday_title", "openingHours.thursday_value", "openingHours.friday_title", "openingHours.friday_value", "openingHours.saturday_title", "openingHours.saturday_value", "openingHours.sunday_title", "openingHours.sunday_value"]}	[]	1	2021-07-21 11:15:34.197+02	2021-07-21 11:15:34.216+02
8881	plugins::content-manager.explorer.create	application::referent.referent	{"fields": ["name", "email", "environnement", "address", "address_zipcode", "address_city", "phone_number", "latitude", "longitude", "users", "openingHours.monday_title", "openingHours.monday_value", "openingHours.tuesday_title", "openingHours.tuesday_value", "openingHours.wednesday_title", "openingHours.wednesday_value", "openingHours.thursday_title", "openingHours.thursday_value", "openingHours.friday_title", "openingHours.friday_value", "openingHours.saturday_title", "openingHours.saturday_value", "openingHours.sunday_title", "openingHours.sunday_value"]}	["admin::simple-zone-guyane"]	6	2021-07-21 15:06:56.094+02	2021-07-21 15:06:56.105+02
8886	plugins::content-manager.explorer.create	application::contact.contact	{"fields": ["name", "email", "zipcode", "box", "zone", "type"]}	[]	1	2021-07-22 13:50:45.749+02	2021-07-22 13:50:45.774+02
8599	plugins::content-manager.explorer.publish	application::content.content	{}	["admin::theme-zone-metropole"]	3	2021-07-21 12:26:39.547+02	2021-07-21 12:26:39.569+02
8896	plugins::content-manager.explorer.delete	application::parametres.parametres	{}	[]	1	2021-07-22 13:50:45.82+02	2021-07-22 13:50:45.843+02
8906	plugins::content-manager.explorer.publish	application::referent.referent	{}	[]	1	2021-07-22 13:50:45.889+02	2021-07-22 13:50:45.898+02
8625	plugins::content-manager.explorer.read	application::content.content	{"fields": ["title", "text", "image", "sound", "theme"]}	["admin::theme-zone-guyane"]	6	2021-07-21 12:30:10.707+02	2021-07-21 12:30:10.722+02
8882	plugins::content-manager.explorer.read	application::referent.referent	{"fields": ["name", "email", "environnement", "address", "address_zipcode", "address_city", "phone_number", "latitude", "longitude", "users", "openingHours.monday_title", "openingHours.monday_value", "openingHours.tuesday_title", "openingHours.tuesday_value", "openingHours.wednesday_title", "openingHours.wednesday_value", "openingHours.thursday_title", "openingHours.thursday_value", "openingHours.friday_title", "openingHours.friday_value", "openingHours.saturday_title", "openingHours.saturday_value", "openingHours.sunday_title", "openingHours.sunday_value"]}	["admin::simple-zone-guyane"]	6	2021-07-21 15:06:56.094+02	2021-07-21 15:06:56.108+02
8887	plugins::content-manager.explorer.read	application::contact.contact	{"fields": ["name", "email", "zipcode", "box", "zone", "type"]}	[]	1	2021-07-22 13:50:45.749+02	2021-07-22 13:50:45.774+02
8897	plugins::content-manager.explorer.delete	application::produit.produit	{}	[]	1	2021-07-22 13:50:45.82+02	2021-07-22 13:50:45.844+02
8394	plugins::content-manager.explorer.update	application::box-sur-mesure.box-sur-mesure	{"fields": ["title", "description", "image", "produits.stock", "produits.produit"]}	[]	6	2021-07-21 11:06:14.578+02	2021-07-21 11:06:14.595+02
8907	plugins::content-manager.explorer.publish	application::reponse.reponse	{}	[]	1	2021-07-22 13:50:45.889+02	2021-07-22 13:50:45.898+02
8600	plugins::content-manager.explorer.read	application::question.question	{"fields": ["text_question", "text_answer", "image", "responses.response_A", "responses.response_B", "responses.response_C", "responses.response_A_neutral", "responses.response_B_neutral", "responses.response_C_neutral", "responses.right_answer", "theme"]}	["admin::theme-zone-metropole"]	3	2021-07-21 12:26:39.547+02	2021-07-21 12:26:39.57+02
8627	plugins::content-manager.explorer.delete	application::content.content	{}	["admin::theme-zone-guyane"]	6	2021-07-21 12:30:10.707+02	2021-07-21 12:30:10.725+02
8626	plugins::content-manager.explorer.update	application::content.content	{"fields": ["title", "text", "image", "sound", "theme"]}	["admin::theme-zone-guyane"]	6	2021-07-21 12:30:10.707+02	2021-07-21 12:30:10.725+02
8395	plugins::content-manager.explorer.delete	application::box-sur-mesure.box-sur-mesure	{}	[]	6	2021-07-21 11:06:14.578+02	2021-07-21 11:06:14.596+02
8883	plugins::content-manager.explorer.update	application::referent.referent	{"fields": ["name", "email", "environnement", "address", "address_zipcode", "address_city", "phone_number", "latitude", "longitude", "users", "openingHours.monday_title", "openingHours.monday_value", "openingHours.tuesday_title", "openingHours.tuesday_value", "openingHours.wednesday_title", "openingHours.wednesday_value", "openingHours.thursday_title", "openingHours.thursday_value", "openingHours.friday_title", "openingHours.friday_value", "openingHours.saturday_title", "openingHours.saturday_value", "openingHours.sunday_title", "openingHours.sunday_value"]}	["admin::simple-zone-guyane"]	6	2021-07-21 15:06:56.099+02	2021-07-21 15:06:56.114+02
8888	plugins::content-manager.explorer.update	application::contact.contact	{"fields": ["name", "email", "zipcode", "box", "zone", "type"]}	[]	1	2021-07-22 13:50:45.749+02	2021-07-22 13:50:45.774+02
8601	plugins::content-manager.explorer.update	application::question.question	{"fields": ["text_question", "text_answer", "image", "responses.response_A", "responses.response_B", "responses.response_C", "responses.response_A_neutral", "responses.response_B_neutral", "responses.response_C_neutral", "responses.right_answer", "theme"]}	["admin::theme-zone-metropole"]	3	2021-07-21 12:26:39.547+02	2021-07-21 12:26:39.57+02
8899	plugins::content-manager.explorer.delete	application::referent.referent	{}	[]	1	2021-07-22 13:50:45.82+02	2021-07-22 13:50:45.844+02
8628	plugins::content-manager.explorer.publish	application::content.content	{}	["admin::theme-zone-guyane"]	6	2021-07-21 12:30:10.71+02	2021-07-21 12:30:10.725+02
8492	plugins::content-manager.explorer.read	application::referent.referent	{"fields": ["name", "email", "environnement", "address", "address_zipcode", "address_city", "phone_number", "latitude", "longitude", "users", "openingHours.monday_title", "openingHours.monday_value", "openingHours.tuesday_title", "openingHours.tuesday_value", "openingHours.wednesday_title", "openingHours.wednesday_value", "openingHours.thursday_title", "openingHours.thursday_value", "openingHours.friday_title", "openingHours.friday_value", "openingHours.saturday_title", "openingHours.saturday_value", "openingHours.sunday_title", "openingHours.sunday_value"]}	[]	1	2021-07-21 11:15:34.197+02	2021-07-21 11:15:34.216+02
8493	plugins::content-manager.explorer.update	application::referent.referent	{"fields": ["name", "email", "environnement", "address", "address_zipcode", "address_city", "phone_number", "latitude", "longitude", "users", "openingHours.monday_title", "openingHours.monday_value", "openingHours.tuesday_title", "openingHours.tuesday_value", "openingHours.wednesday_title", "openingHours.wednesday_value", "openingHours.thursday_title", "openingHours.thursday_value", "openingHours.friday_title", "openingHours.friday_value", "openingHours.saturday_title", "openingHours.saturday_value", "openingHours.sunday_title", "openingHours.sunday_value"]}	[]	1	2021-07-21 11:15:34.197+02	2021-07-21 11:15:34.216+02
8884	plugins::content-manager.explorer.delete	application::referent.referent	{}	["admin::simple-zone-guyane"]	6	2021-07-21 15:06:56.101+02	2021-07-21 15:06:56.114+02
8889	plugins::content-manager.explorer.delete	application::box-sur-mesure.box-sur-mesure	{}	[]	1	2021-07-22 13:50:45.75+02	2021-07-22 13:50:45.775+02
8900	plugins::content-manager.explorer.delete	application::reponse.reponse	{}	[]	1	2021-07-22 13:50:45.821+02	2021-07-22 13:50:45.852+02
8602	plugins::content-manager.explorer.delete	application::question.question	{}	["admin::theme-zone-metropole"]	3	2021-07-21 12:26:39.548+02	2021-07-21 12:26:39.57+02
8885	plugins::content-manager.explorer.publish	application::referent.referent	{}	["admin::simple-zone-guyane"]	6	2021-07-21 15:06:56.105+02	2021-07-21 15:06:56.118+02
8890	plugins::content-manager.explorer.delete	application::box.box	{}	[]	1	2021-07-22 13:50:45.75+02	2021-07-22 13:50:45.775+02
8898	plugins::content-manager.explorer.delete	application::question.question	{}	[]	1	2021-07-22 13:50:45.82+02	2021-07-22 13:50:45.844+02
8908	plugins::content-manager.explorer.publish	application::thematique.thematique	{}	[]	1	2021-07-22 13:50:45.89+02	2021-07-22 13:50:45.9+02
8791	plugins::content-manager.explorer.read	application::box.box	{"fields": ["title", "image", "products.quantity", "products.produit", "stock", "environnement", "description", "available", "number"]}	["admin::simple-zone-guyane"]	6	2021-07-21 14:51:00.357+02	2021-07-21 14:51:00.36+02
8891	plugins::content-manager.explorer.delete	application::contact.contact	{}	[]	1	2021-07-22 13:50:45.75+02	2021-07-22 13:50:45.775+02
8904	plugins::content-manager.explorer.publish	application::content.content	{}	[]	1	2021-07-22 13:50:45.826+02	2021-07-22 13:50:45.851+02
8584	plugins::content-manager.explorer.create	application::content.content	{"fields": ["title", "text", "image", "sound", "theme"]}	["admin::theme-zone-guyane"]	4	2021-07-21 12:26:03.744+02	2021-07-21 12:26:03.766+02
8792	plugins::content-manager.explorer.create	application::produit.produit	{"fields": ["title", "description", "image"]}	[]	6	2021-07-21 14:54:08.86+02	2021-07-21 14:54:08.87+02
8392	plugins::content-manager.explorer.create	application::box-sur-mesure.box-sur-mesure	{"fields": ["title", "description", "image", "produits.stock", "produits.produit"]}	[]	6	2021-07-21 11:06:14.558+02	2021-07-21 11:06:14.578+02
8892	plugins::content-manager.explorer.delete	application::commande.commande	{}	[]	1	2021-07-22 13:50:45.75+02	2021-07-22 13:50:45.775+02
8902	plugins::content-manager.explorer.publish	application::box-sur-mesure.box-sur-mesure	{}	[]	1	2021-07-22 13:50:45.826+02	2021-07-22 13:50:45.851+02
8393	plugins::content-manager.explorer.read	application::box-sur-mesure.box-sur-mesure	{"fields": ["title", "description", "image", "produits.stock", "produits.produit"]}	[]	6	2021-07-21 11:06:14.578+02	2021-07-21 11:06:14.593+02
8793	plugins::content-manager.explorer.delete	application::produit.produit	{}	[]	6	2021-07-21 14:54:08.86+02	2021-07-21 14:54:08.872+02
8893	plugins::content-manager.explorer.delete	application::environnement.environnement	{}	[]	1	2021-07-22 13:50:45.751+02	2021-07-22 13:50:45.775+02
8585	plugins::content-manager.explorer.read	application::content.content	{"fields": ["title", "text", "image", "sound", "theme"]}	["admin::theme-zone-guyane"]	4	2021-07-21 12:26:03.744+02	2021-07-21 12:26:03.766+02
8901	plugins::content-manager.explorer.delete	application::thematique.thematique	{}	[]	1	2021-07-22 13:50:45.826+02	2021-07-22 13:50:45.85+02
8794	plugins::content-manager.explorer.read	application::produit.produit	{"fields": ["title", "description", "image"]}	[]	6	2021-07-21 14:54:08.861+02	2021-07-21 14:54:08.872+02
8894	plugins::content-manager.explorer.delete	application::content.content	{}	[]	1	2021-07-22 13:50:45.751+02	2021-07-22 13:50:45.782+02
8586	plugins::content-manager.explorer.update	application::content.content	{"fields": ["title", "text", "image", "sound", "theme"]}	["admin::theme-zone-guyane"]	4	2021-07-21 12:26:03.745+02	2021-07-21 12:26:03.766+02
8905	plugins::content-manager.explorer.publish	application::question.question	{}	[]	1	2021-07-22 13:50:45.832+02	2021-07-22 13:50:45.859+02
8795	plugins::content-manager.explorer.update	application::produit.produit	{"fields": ["title", "description", "image"]}	[]	6	2021-07-21 14:54:08.863+02	2021-07-21 14:54:08.874+02
8895	plugins::content-manager.explorer.delete	application::feedback.feedback	{}	[]	1	2021-07-22 13:50:45.758+02	2021-07-22 13:50:45.782+02
8587	plugins::content-manager.explorer.delete	application::content.content	{}	["admin::theme-zone-guyane"]	4	2021-07-21 12:26:03.745+02	2021-07-21 12:26:03.766+02
8903	plugins::content-manager.explorer.publish	application::box.box	{}	[]	1	2021-07-22 13:50:45.826+02	2021-07-22 13:50:45.851+02
8588	plugins::content-manager.explorer.publish	application::content.content	{}	["admin::theme-zone-guyane"]	4	2021-07-21 12:26:03.745+02	2021-07-21 12:26:03.766+02
8589	plugins::content-manager.explorer.create	application::question.question	{"fields": ["text_question", "text_answer", "image", "responses.response_A", "responses.response_B", "responses.response_C", "responses.response_A_neutral", "responses.response_B_neutral", "responses.response_C_neutral", "responses.right_answer", "theme"]}	["admin::theme-zone-guyane"]	4	2021-07-21 12:26:03.745+02	2021-07-21 12:26:03.766+02
8779	plugins::content-manager.explorer.read	application::commande.commande	{"fields": ["first_name", "last_name", "email", "delivery", "content", "address", "address_dept", "address_region", "address_zipcode", "poi_name", "name", "address_deptcode", "phone", "address_city", "address_more", "poi_number", "referent", "sent"]}	["admin::order-zone-guyane"]	6	2021-07-21 12:47:41.819+02	2021-07-21 12:47:41.822+02
8590	plugins::content-manager.explorer.read	application::question.question	{"fields": ["text_question", "text_answer", "image", "responses.response_A", "responses.response_B", "responses.response_C", "responses.response_A_neutral", "responses.response_B_neutral", "responses.response_C_neutral", "responses.right_answer", "theme"]}	["admin::theme-zone-guyane"]	4	2021-07-21 12:26:03.746+02	2021-07-21 12:26:03.766+02
8603	plugins::content-manager.explorer.publish	application::question.question	{}	["admin::theme-zone-metropole"]	3	2021-07-21 12:26:39.548+02	2021-07-21 12:26:39.575+02
8591	plugins::content-manager.explorer.update	application::question.question	{"fields": ["text_question", "text_answer", "image", "responses.response_A", "responses.response_B", "responses.response_C", "responses.response_A_neutral", "responses.response_B_neutral", "responses.response_C_neutral", "responses.right_answer", "theme"]}	["admin::theme-zone-guyane"]	4	2021-07-21 12:26:03.746+02	2021-07-21 12:26:03.766+02
8597	plugins::content-manager.explorer.delete	application::content.content	{}	["admin::theme-zone-metropole"]	3	2021-07-21 12:26:39.547+02	2021-07-21 12:26:39.569+02
\.


--
-- Data for Name: strapi_role; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.strapi_role (id, name, code, description, created_at, updated_at) FROM stdin;
1	Super Admin	strapi-super-admin	Super Admins can access and manage all features and settings.	2021-05-17 17:25:41.301+02	2021-05-17 17:25:41.301+02
5	Référent	referent-kr1up6yc	Rôle pour les référents	2021-07-13 11:27:15.062+02	2021-07-13 11:33:42.087+02
4	Coordinateur Guyane	referent-guyane-kou62om9	Rôle pour les coordinateurs guyanais	2021-05-18 17:04:06.183+02	2021-07-13 11:33:56.334+02
3	Coordinateur Métropole	strapi-author	Rôle pour les coordinateurs métropolitains	2021-05-17 17:25:41.344+02	2021-07-13 11:33:51.301+02
6	Pilote guyane	pilote-guyane-krd9gze1	Pilote pour la guyane	2021-07-21 11:06:14.186+02	2021-07-21 12:23:40.669+02
\.


--
-- Data for Name: strapi_users_roles; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.strapi_users_roles (id, user_id, role_id) FROM stdin;
1	1	1
5	3	3
6	4	1
7	5	4
8	6	1
9	7	5
10	8	6
\.


--
-- Data for Name: strapi_webhooks; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.strapi_webhooks (id, name, url, headers, events, enabled) FROM stdin;
\.


--
-- Data for Name: test; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.test (id, test_1, test_2, published_at, created_by, updated_by, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: thematiques; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.thematiques (id, title, published_at, created_by, updated_by, created_at, updated_at, environnement, question) FROM stdin;
3	Test 3	2021-05-18 11:39:23.182+02	1	1	2021-05-18 10:51:30.815+02	2021-05-18 11:39:23.219+02	1	\N
1	Thématique 1	2021-05-17 17:27:48.178+02	1	1	2021-05-17 17:27:39.847+02	2021-05-18 11:40:48.164+02	2	1
2	Thématique 2	2021-05-17 17:28:13.486+02	1	1	2021-05-17 17:28:04.219+02	2021-05-18 11:40:48.164+02	1	1
\.


--
-- Data for Name: themes; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.themes (id, title, environnement, published_at, created_by, updated_by, created_at, updated_at, display_quizz, display_quiz, title_backoffice) FROM stdin;
\.


--
-- Data for Name: upload_file; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.upload_file (id, name, "alternativeText", caption, width, height, formats, hash, ext, mime, size, url, "previewUrl", provider, provider_metadata, created_by, updated_by, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: upload_file_morph; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.upload_file_morph (id, upload_file_id, related_id, related_type, field, "order") FROM stdin;
\.


--
-- Data for Name: users-permissions_permission; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public."users-permissions_permission" (id, type, controller, action, enabled, policy, role, created_by, updated_by) FROM stdin;
1	application	content	count	f		1	\N	\N
2	application	content	count	f		2	\N	\N
3	application	content	create	f		1	\N	\N
4	application	content	create	f		2	\N	\N
5	application	content	delete	f		1	\N	\N
6	application	content	delete	f		2	\N	\N
7	application	content	find	f		1	\N	\N
75	content-manager	content-types	findcontenttypes	t		1	\N	\N
9	application	content	findone	f		1	\N	\N
10	application	content	findone	f		2	\N	\N
77	content-manager	content-types	findcontenttypessettings	t		1	\N	\N
11	application	content	update	f		1	\N	\N
12	application	content	update	f		2	\N	\N
13	application	environnement	count	f		1	\N	\N
15	application	environnement	create	f		1	\N	\N
16	application	environnement	create	f		2	\N	\N
17	application	environnement	delete	f		1	\N	\N
14	application	environnement	count	f		2	\N	\N
18	application	environnement	delete	f		2	\N	\N
19	application	environnement	find	f		1	\N	\N
73	content-manager	content-types	findcontenttypeconfiguration	t		1	\N	\N
22	application	environnement	findone	f		2	\N	\N
23	application	environnement	update	f		1	\N	\N
24	application	environnement	update	f		2	\N	\N
25	application	question	count	f		1	\N	\N
21	application	environnement	findone	f		1	\N	\N
27	application	question	create	f		1	\N	\N
26	application	question	count	f		2	\N	\N
28	application	question	create	f		2	\N	\N
29	application	question	delete	f		1	\N	\N
30	application	question	delete	f		2	\N	\N
57	content-manager	collection-types	findone	t		1	\N	\N
31	application	question	find	f		1	\N	\N
51	content-manager	collection-types	create	t		1	\N	\N
33	application	question	findone	f		1	\N	\N
34	application	question	findone	f		2	\N	\N
35	application	question	update	f		1	\N	\N
36	application	question	update	f		2	\N	\N
37	application	thematique	count	f		1	\N	\N
38	application	thematique	count	f		2	\N	\N
39	application	thematique	create	f		1	\N	\N
40	application	thematique	create	f		2	\N	\N
41	application	thematique	delete	f		1	\N	\N
42	application	thematique	delete	f		2	\N	\N
43	application	thematique	find	f		1	\N	\N
61	content-manager	collection-types	publish	t		1	\N	\N
45	application	thematique	findone	f		1	\N	\N
46	application	thematique	findone	f		2	\N	\N
47	application	thematique	update	f		1	\N	\N
48	application	thematique	update	f		2	\N	\N
55	content-manager	collection-types	find	t		1	\N	\N
50	content-manager	collection-types	bulkdelete	f		2	\N	\N
52	content-manager	collection-types	create	f		2	\N	\N
65	content-manager	collection-types	update	t		1	\N	\N
54	content-manager	collection-types	delete	f		2	\N	\N
56	content-manager	collection-types	find	f		2	\N	\N
58	content-manager	collection-types	findone	f		2	\N	\N
63	content-manager	collection-types	unpublish	t		1	\N	\N
60	content-manager	collection-types	previewmanyrelations	f		2	\N	\N
62	content-manager	collection-types	publish	f		2	\N	\N
64	content-manager	collection-types	unpublish	f		2	\N	\N
66	content-manager	collection-types	update	f		2	\N	\N
87	content-manager	single-types	find	t		1	\N	\N
68	content-manager	components	findcomponentconfiguration	f		2	\N	\N
70	content-manager	components	findcomponents	f		2	\N	\N
72	content-manager	components	updatecomponentconfiguration	f		2	\N	\N
74	content-manager	content-types	findcontenttypeconfiguration	f		2	\N	\N
76	content-manager	content-types	findcontenttypes	f		2	\N	\N
8	application	content	find	t		2	\N	\N
44	application	thematique	find	t		2	\N	\N
78	content-manager	content-types	findcontenttypessettings	f		2	\N	\N
90	content-manager	single-types	publish	f		2	\N	\N
97	content-type-builder	builder	getreservednames	f		1	\N	\N
100	content-type-builder	componentcategories	deletecategory	f		2	\N	\N
107	content-type-builder	components	getcomponent	f		1	\N	\N
110	content-type-builder	components	getcomponents	f		2	\N	\N
117	content-type-builder	contenttypes	deletecontenttype	f		1	\N	\N
118	content-type-builder	contenttypes	deletecontenttype	f		2	\N	\N
128	email	email	send	f		2	\N	\N
129	email	email	test	f		1	\N	\N
138	i18n	locales	deletelocale	f		2	\N	\N
105	content-type-builder	components	deletecomponent	f		1	\N	\N
115	content-type-builder	contenttypes	createcontenttype	f		1	\N	\N
123	content-type-builder	contenttypes	updatecontenttype	f		1	\N	\N
131	i18n	content-types	getnonlocalizedattributes	f		1	\N	\N
142	i18n	locales	updatelocale	f		2	\N	\N
151	upload	upload	getsettings	f		1	\N	\N
164	users-permissions	auth	emailconfirmation	t		2	\N	\N
171	users-permissions	auth	sendemailconfirmation	f		1	\N	\N
181	users-permissions	user	find	f		1	\N	\N
192	users-permissions	userspermissions	deleterole	f		2	\N	\N
201	users-permissions	userspermissions	getproviders	f		1	\N	\N
211	users-permissions	userspermissions	searchusers	f		1	\N	\N
32	application	question	find	t		2	\N	\N
71	content-manager	components	updatecomponentconfiguration	t		1	\N	\N
91	content-manager	single-types	unpublish	t		1	\N	\N
81	content-manager	relations	find	t		1	\N	\N
80	content-manager	content-types	updatecontenttypeconfiguration	f		2	\N	\N
88	content-manager	single-types	find	f		2	\N	\N
98	content-type-builder	builder	getreservednames	f		2	\N	\N
108	content-type-builder	components	getcomponent	f		2	\N	\N
120	content-type-builder	contenttypes	getcontenttype	f		2	\N	\N
130	email	email	test	f		2	\N	\N
140	i18n	locales	listlocales	f		2	\N	\N
150	upload	upload	findone	f		2	\N	\N
160	users-permissions	auth	callback	t		2	\N	\N
170	users-permissions	auth	resetpassword	t		2	\N	\N
178	users-permissions	user	destroyall	f		1	\N	\N
189	users-permissions	userspermissions	createrole	f		1	\N	\N
197	users-permissions	userspermissions	getpermissions	f		1	\N	\N
209	users-permissions	userspermissions	index	f		1	\N	\N
220	users-permissions	userspermissions	updaterole	f		2	\N	\N
20	application	environnement	find	t		2	\N	\N
69	content-manager	components	findcomponents	t		1	\N	\N
82	content-manager	relations	find	f		2	\N	\N
94	content-manager	uid	checkuidavailability	f		2	\N	\N
102	content-type-builder	componentcategories	editcategory	f		2	\N	\N
103	content-type-builder	components	createcomponent	f		1	\N	\N
111	content-type-builder	components	updatecomponent	f		1	\N	\N
112	content-type-builder	components	updatecomponent	f		2	\N	\N
124	content-type-builder	contenttypes	updatecontenttype	f		2	\N	\N
125	email	email	getsettings	f		1	\N	\N
135	i18n	locales	createlocale	f		1	\N	\N
134	i18n	iso-locales	listisolocales	f		2	\N	\N
145	upload	upload	destroy	f		1	\N	\N
146	upload	upload	destroy	f		2	\N	\N
154	upload	upload	search	f		2	\N	\N
156	upload	upload	updatesettings	f		2	\N	\N
162	users-permissions	auth	connect	t		2	\N	\N
165	users-permissions	auth	forgotpassword	f		1	\N	\N
172	users-permissions	auth	sendemailconfirmation	f		2	\N	\N
175	users-permissions	user	create	f		1	\N	\N
182	users-permissions	user	find	f		2	\N	\N
184	users-permissions	user	findone	f		2	\N	\N
193	users-permissions	userspermissions	getadvancedsettings	f		1	\N	\N
194	users-permissions	userspermissions	getadvancedsettings	f		2	\N	\N
202	users-permissions	userspermissions	getproviders	f		2	\N	\N
203	users-permissions	userspermissions	getrole	f		1	\N	\N
213	users-permissions	userspermissions	updateadvancedsettings	f		1	\N	\N
214	users-permissions	userspermissions	updateadvancedsettings	f		2	\N	\N
67	content-manager	components	findcomponentconfiguration	t		1	\N	\N
93	content-manager	uid	checkuidavailability	t		1	\N	\N
83	content-manager	single-types	createorupdate	t		1	\N	\N
84	content-manager	single-types	createorupdate	f		2	\N	\N
92	content-manager	single-types	unpublish	f		2	\N	\N
101	content-type-builder	componentcategories	editcategory	f		1	\N	\N
104	content-type-builder	components	createcomponent	f		2	\N	\N
113	content-type-builder	connections	getconnections	f		1	\N	\N
114	content-type-builder	connections	getconnections	f		2	\N	\N
122	content-type-builder	contenttypes	getcontenttypes	f		2	\N	\N
126	email	email	getsettings	f		2	\N	\N
133	i18n	iso-locales	listisolocales	f		1	\N	\N
136	i18n	locales	createlocale	f		2	\N	\N
143	upload	upload	count	f		1	\N	\N
144	upload	upload	count	f		2	\N	\N
152	upload	upload	getsettings	f		2	\N	\N
155	upload	upload	updatesettings	f		1	\N	\N
161	users-permissions	auth	connect	t		1	\N	\N
166	users-permissions	auth	forgotpassword	t		2	\N	\N
173	users-permissions	user	count	f		1	\N	\N
176	users-permissions	user	create	f		2	\N	\N
183	users-permissions	user	findone	f		1	\N	\N
186	users-permissions	user	me	t		2	\N	\N
191	users-permissions	userspermissions	deleterole	f		1	\N	\N
195	users-permissions	userspermissions	getemailtemplate	f		1	\N	\N
205	users-permissions	userspermissions	getroles	f		1	\N	\N
204	users-permissions	userspermissions	getrole	f		2	\N	\N
212	users-permissions	userspermissions	searchusers	f		2	\N	\N
216	users-permissions	userspermissions	updateemailtemplate	f		2	\N	\N
59	content-manager	collection-types	previewmanyrelations	t		1	\N	\N
95	content-manager	uid	generateuid	t		1	\N	\N
85	content-manager	single-types	delete	t		1	\N	\N
86	content-manager	single-types	delete	f		2	\N	\N
96	content-manager	uid	generateuid	f		2	\N	\N
106	content-type-builder	components	deletecomponent	f		2	\N	\N
116	content-type-builder	contenttypes	createcontenttype	f		2	\N	\N
121	content-type-builder	contenttypes	getcontenttypes	f		1	\N	\N
132	i18n	content-types	getnonlocalizedattributes	f		2	\N	\N
141	i18n	locales	updatelocale	f		1	\N	\N
153	upload	upload	search	f		1	\N	\N
163	users-permissions	auth	emailconfirmation	f		1	\N	\N
174	users-permissions	user	count	f		2	\N	\N
185	users-permissions	user	me	t		1	\N	\N
196	users-permissions	userspermissions	getemailtemplate	f		2	\N	\N
206	users-permissions	userspermissions	getroles	f		2	\N	\N
215	users-permissions	userspermissions	updateemailtemplate	f		1	\N	\N
53	content-manager	collection-types	delete	t		1	\N	\N
139	i18n	locales	listlocales	f		1	\N	\N
149	upload	upload	findone	f		1	\N	\N
158	upload	upload	upload	f		2	\N	\N
167	users-permissions	auth	register	f		1	\N	\N
179	users-permissions	user	destroy	f		2	\N	\N
188	users-permissions	user	update	f		2	\N	\N
200	users-permissions	userspermissions	getpolicies	f		2	\N	\N
207	users-permissions	userspermissions	getroutes	f		1	\N	\N
218	users-permissions	userspermissions	updateproviders	f		2	\N	\N
49	content-manager	collection-types	bulkdelete	t		1	\N	\N
148	upload	upload	find	f		2	\N	\N
159	users-permissions	auth	callback	f		1	\N	\N
169	users-permissions	auth	resetpassword	f		1	\N	\N
180	users-permissions	user	destroyall	f		2	\N	\N
190	users-permissions	userspermissions	createrole	f		2	\N	\N
198	users-permissions	userspermissions	getpermissions	f		2	\N	\N
208	users-permissions	userspermissions	getroutes	f		2	\N	\N
217	users-permissions	userspermissions	updateproviders	f		1	\N	\N
99	content-type-builder	componentcategories	deletecategory	f		1	\N	\N
109	content-type-builder	components	getcomponents	f		1	\N	\N
119	content-type-builder	contenttypes	getcontenttype	f		1	\N	\N
127	email	email	send	f		1	\N	\N
137	i18n	locales	deletelocale	f		1	\N	\N
147	upload	upload	find	f		1	\N	\N
157	upload	upload	upload	f		1	\N	\N
168	users-permissions	auth	register	t		2	\N	\N
177	users-permissions	user	destroy	f		1	\N	\N
187	users-permissions	user	update	f		1	\N	\N
199	users-permissions	userspermissions	getpolicies	f		1	\N	\N
210	users-permissions	userspermissions	index	f		2	\N	\N
219	users-permissions	userspermissions	updaterole	f		1	\N	\N
79	content-manager	content-types	updatecontenttypeconfiguration	t		1	\N	\N
89	content-manager	single-types	publish	t		1	\N	\N
\.


--
-- Data for Name: users-permissions_role; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public."users-permissions_role" (id, name, description, type, created_by, updated_by) FROM stdin;
2	Public	Default role given to unauthenticated user.	public	\N	\N
1	Authenticated	Default role given to authenticated user.	authenticated	\N	\N
\.


--
-- Data for Name: users-permissions_user; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public."users-permissions_user" (id, username, email, provider, password, "resetPasswordToken", "confirmationToken", confirmed, blocked, role, created_by, updated_by, created_at, updated_at) FROM stdin;
1	testreferent	referent@test.loc	local	$2a$10$asc5PUXeEKzIBlqVQDhJDuHIb890hrKYIvLBKhS0L6JBfkcOg9i9O	\N	\N	t	f	1	1	1	2021-05-18 14:33:59.814+02	2021-05-18 14:33:59.83+02
\.


--
-- Name: AnswerTexts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public."AnswerTexts_id_seq"', 12, true);


--
-- Name: Feedback_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public."Feedback_id_seq"', 256, true);


--
-- Name: answer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.answer_id_seq', 1, false);


--
-- Name: box-dynamic_components_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public."box-dynamic_components_id_seq"', 5, true);


--
-- Name: box-dynamic_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public."box-dynamic_id_seq"', 3, true);


--
-- Name: box_components_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.box_components_id_seq', 320, true);


--
-- Name: box_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.box_id_seq', 43, true);


--
-- Name: components_commandes_box_sur_mesure_produits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.components_commandes_box_sur_mesure_produits_id_seq', 81, true);


--
-- Name: components_commandes_box_sur_mesures_components_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.components_commandes_box_sur_mesures_components_id_seq', 75, true);


--
-- Name: components_commandes_box_sur_mesures_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.components_commandes_box_sur_mesures_id_seq', 47, true);


--
-- Name: components_commandes_boxes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.components_commandes_boxes_id_seq', 2345, true);


--
-- Name: components_referents_opening_hours_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.components_referents_opening_hours_id_seq', 1, false);


--
-- Name: components_referents_openings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.components_referents_openings_id_seq', 1, false);


--
-- Name: components_referents_time_tables_components_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.components_referents_time_tables_components_id_seq', 1, false);


--
-- Name: components_referents_time_tables_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.components_referents_time_tables_id_seq', 1, false);


--
-- Name: components_stocks_box_produit_sur_mesures_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.components_stocks_box_produit_sur_mesures_id_seq', 5, true);


--
-- Name: components_stocks_box_produits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.components_stocks_box_produits_id_seq', 320, true);


--
-- Name: contact_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.contact_id_seq', 13, true);


--
-- Name: contents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.contents_id_seq', 3673, true);


--
-- Name: core_store_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.core_store_id_seq', 75, true);


--
-- Name: environnements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.environnements_id_seq', 3, true);


--
-- Name: i18n_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.i18n_locales_id_seq', 2, true);


--
-- Name: order_components_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.order_components_id_seq', 2388, true);


--
-- Name: order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.order_id_seq', 2397, true);


--
-- Name: produits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.produits_id_seq', 225, true);


--
-- Name: questions_components_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.questions_components_id_seq', 2574, true);


--
-- Name: questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.questions_id_seq', 2564, true);


--
-- Name: referents__users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.referents__users_id_seq', 2, true);


--
-- Name: referents_components_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.referents_components_id_seq', 1, false);


--
-- Name: referents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.referents_id_seq', 39, true);


--
-- Name: reponses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.reponses_id_seq', 83, true);


--
-- Name: responses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.responses_id_seq', 2562, true);


--
-- Name: settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.settings_id_seq', 2, true);


--
-- Name: strapi_administrator_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.strapi_administrator_id_seq', 8, true);


--
-- Name: strapi_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.strapi_permission_id_seq', 8908, true);


--
-- Name: strapi_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.strapi_role_id_seq', 6, true);


--
-- Name: strapi_users_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.strapi_users_roles_id_seq', 10, true);


--
-- Name: strapi_webhooks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.strapi_webhooks_id_seq', 1, false);


--
-- Name: test_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.test_id_seq', 1, false);


--
-- Name: thematiques_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.thematiques_id_seq', 3, true);


--
-- Name: themes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.themes_id_seq', 72, true);


--
-- Name: upload_file_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.upload_file_id_seq', 7244, true);


--
-- Name: upload_file_morph_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.upload_file_morph_id_seq', 7671, true);


--
-- Name: users-permissions_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public."users-permissions_permission_id_seq"', 330, true);


--
-- Name: users-permissions_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public."users-permissions_role_id_seq"', 3, true);


--
-- Name: users-permissions_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public."users-permissions_user_id_seq"', 1, true);


--
-- Name: AnswerTexts AnswerTexts_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public."AnswerTexts"
    ADD CONSTRAINT "AnswerTexts_pkey" PRIMARY KEY (id);


--
-- Name: Feedback Feedback_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public."Feedback"
    ADD CONSTRAINT "Feedback_pkey" PRIMARY KEY (id);


--
-- Name: answer answer_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.answer
    ADD CONSTRAINT answer_pkey PRIMARY KEY (id);


--
-- Name: box-dynamic_components box-dynamic_components_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public."box-dynamic_components"
    ADD CONSTRAINT "box-dynamic_components_pkey" PRIMARY KEY (id);


--
-- Name: box-dynamic box-dynamic_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public."box-dynamic"
    ADD CONSTRAINT "box-dynamic_pkey" PRIMARY KEY (id);


--
-- Name: box_components box_components_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.box_components
    ADD CONSTRAINT box_components_pkey PRIMARY KEY (id);


--
-- Name: box box_number_unique; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.box
    ADD CONSTRAINT box_number_unique UNIQUE (number);


--
-- Name: box box_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.box
    ADD CONSTRAINT box_pkey PRIMARY KEY (id);


--
-- Name: components_commandes_box_sur_mesure_produits components_commandes_box_sur_mesure_produits_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.components_commandes_box_sur_mesure_produits
    ADD CONSTRAINT components_commandes_box_sur_mesure_produits_pkey PRIMARY KEY (id);


--
-- Name: components_commandes_box_sur_mesures_components components_commandes_box_sur_mesures_components_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.components_commandes_box_sur_mesures_components
    ADD CONSTRAINT components_commandes_box_sur_mesures_components_pkey PRIMARY KEY (id);


--
-- Name: components_commandes_box_sur_mesures components_commandes_box_sur_mesures_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.components_commandes_box_sur_mesures
    ADD CONSTRAINT components_commandes_box_sur_mesures_pkey PRIMARY KEY (id);


--
-- Name: components_commandes_boxes components_commandes_boxes_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.components_commandes_boxes
    ADD CONSTRAINT components_commandes_boxes_pkey PRIMARY KEY (id);


--
-- Name: components_referents_opening_hours components_referents_opening_hours_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.components_referents_opening_hours
    ADD CONSTRAINT components_referents_opening_hours_pkey PRIMARY KEY (id);


--
-- Name: components_referents_openings components_referents_openings_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.components_referents_openings
    ADD CONSTRAINT components_referents_openings_pkey PRIMARY KEY (id);


--
-- Name: components_referents_time_tables_components components_referents_time_tables_components_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.components_referents_time_tables_components
    ADD CONSTRAINT components_referents_time_tables_components_pkey PRIMARY KEY (id);


--
-- Name: components_referents_time_tables components_referents_time_tables_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.components_referents_time_tables
    ADD CONSTRAINT components_referents_time_tables_pkey PRIMARY KEY (id);


--
-- Name: components_stocks_box_produit_sur_mesures components_stocks_box_produit_sur_mesures_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.components_stocks_box_produit_sur_mesures
    ADD CONSTRAINT components_stocks_box_produit_sur_mesures_pkey PRIMARY KEY (id);


--
-- Name: components_stocks_box_produits components_stocks_box_produits_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.components_stocks_box_produits
    ADD CONSTRAINT components_stocks_box_produits_pkey PRIMARY KEY (id);


--
-- Name: contact contact_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.contact
    ADD CONSTRAINT contact_pkey PRIMARY KEY (id);


--
-- Name: contents contents_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.contents
    ADD CONSTRAINT contents_pkey PRIMARY KEY (id);


--
-- Name: core_store core_store_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.core_store
    ADD CONSTRAINT core_store_pkey PRIMARY KEY (id);


--
-- Name: environnements environnements_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.environnements
    ADD CONSTRAINT environnements_pkey PRIMARY KEY (id);


--
-- Name: i18n_locales i18n_locales_code_unique; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.i18n_locales
    ADD CONSTRAINT i18n_locales_code_unique UNIQUE (code);


--
-- Name: i18n_locales i18n_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.i18n_locales
    ADD CONSTRAINT i18n_locales_pkey PRIMARY KEY (id);


--
-- Name: order_components order_components_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.order_components
    ADD CONSTRAINT order_components_pkey PRIMARY KEY (id);


--
-- Name: order order_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_pkey PRIMARY KEY (id);


--
-- Name: produits produits_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.produits
    ADD CONSTRAINT produits_pkey PRIMARY KEY (id);


--
-- Name: questions_components questions_components_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.questions_components
    ADD CONSTRAINT questions_components_pkey PRIMARY KEY (id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- Name: referents__users referents__users_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.referents__users
    ADD CONSTRAINT referents__users_pkey PRIMARY KEY (id);


--
-- Name: referents_components referents_components_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.referents_components
    ADD CONSTRAINT referents_components_pkey PRIMARY KEY (id);


--
-- Name: referents referents_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.referents
    ADD CONSTRAINT referents_pkey PRIMARY KEY (id);


--
-- Name: reponses reponses_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.reponses
    ADD CONSTRAINT reponses_pkey PRIMARY KEY (id);


--
-- Name: responses responses_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.responses
    ADD CONSTRAINT responses_pkey PRIMARY KEY (id);


--
-- Name: settings settings_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.settings
    ADD CONSTRAINT settings_pkey PRIMARY KEY (id);


--
-- Name: strapi_administrator strapi_administrator_email_unique; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.strapi_administrator
    ADD CONSTRAINT strapi_administrator_email_unique UNIQUE (email);


--
-- Name: strapi_administrator strapi_administrator_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.strapi_administrator
    ADD CONSTRAINT strapi_administrator_pkey PRIMARY KEY (id);


--
-- Name: strapi_permission strapi_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.strapi_permission
    ADD CONSTRAINT strapi_permission_pkey PRIMARY KEY (id);


--
-- Name: strapi_role strapi_role_code_unique; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.strapi_role
    ADD CONSTRAINT strapi_role_code_unique UNIQUE (code);


--
-- Name: strapi_role strapi_role_name_unique; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.strapi_role
    ADD CONSTRAINT strapi_role_name_unique UNIQUE (name);


--
-- Name: strapi_role strapi_role_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.strapi_role
    ADD CONSTRAINT strapi_role_pkey PRIMARY KEY (id);


--
-- Name: strapi_users_roles strapi_users_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.strapi_users_roles
    ADD CONSTRAINT strapi_users_roles_pkey PRIMARY KEY (id);


--
-- Name: strapi_webhooks strapi_webhooks_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.strapi_webhooks
    ADD CONSTRAINT strapi_webhooks_pkey PRIMARY KEY (id);


--
-- Name: test test_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.test
    ADD CONSTRAINT test_pkey PRIMARY KEY (id);


--
-- Name: thematiques thematiques_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.thematiques
    ADD CONSTRAINT thematiques_pkey PRIMARY KEY (id);


--
-- Name: themes themes_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.themes
    ADD CONSTRAINT themes_pkey PRIMARY KEY (id);


--
-- Name: upload_file_morph upload_file_morph_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.upload_file_morph
    ADD CONSTRAINT upload_file_morph_pkey PRIMARY KEY (id);


--
-- Name: upload_file upload_file_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.upload_file
    ADD CONSTRAINT upload_file_pkey PRIMARY KEY (id);


--
-- Name: users-permissions_permission users-permissions_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public."users-permissions_permission"
    ADD CONSTRAINT "users-permissions_permission_pkey" PRIMARY KEY (id);


--
-- Name: users-permissions_role users-permissions_role_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public."users-permissions_role"
    ADD CONSTRAINT "users-permissions_role_pkey" PRIMARY KEY (id);


--
-- Name: users-permissions_role users-permissions_role_type_unique; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public."users-permissions_role"
    ADD CONSTRAINT "users-permissions_role_type_unique" UNIQUE (type);


--
-- Name: users-permissions_user users-permissions_user_pkey; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public."users-permissions_user"
    ADD CONSTRAINT "users-permissions_user_pkey" PRIMARY KEY (id);


--
-- Name: users-permissions_user users-permissions_user_username_unique; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public."users-permissions_user"
    ADD CONSTRAINT "users-permissions_user_username_unique" UNIQUE (username);


--
-- Name: box-dynamic_components box-dynamic_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public."box-dynamic_components"
    ADD CONSTRAINT "box-dynamic_id_fk" FOREIGN KEY ("box-dynamic_id") REFERENCES public."box-dynamic"(id) ON DELETE CASCADE;


--
-- Name: box_components box_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.box_components
    ADD CONSTRAINT box_id_fk FOREIGN KEY (box_id) REFERENCES public.box(id) ON DELETE CASCADE;


--
-- Name: components_commandes_box_sur_mesures_components components_commandes_box_sur_mesure_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.components_commandes_box_sur_mesures_components
    ADD CONSTRAINT components_commandes_box_sur_mesure_id_fk FOREIGN KEY (components_commandes_box_sur_mesure_id) REFERENCES public.components_commandes_box_sur_mesures(id) ON DELETE CASCADE;


--
-- Name: components_referents_time_tables_components components_referents_time_table_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.components_referents_time_tables_components
    ADD CONSTRAINT components_referents_time_table_id_fk FOREIGN KEY (components_referents_time_table_id) REFERENCES public.components_referents_time_tables(id) ON DELETE CASCADE;


--
-- Name: order_components order_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.order_components
    ADD CONSTRAINT order_id_fk FOREIGN KEY (order_id) REFERENCES public."order"(id) ON DELETE CASCADE;


--
-- Name: questions_components question_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.questions_components
    ADD CONSTRAINT question_id_fk FOREIGN KEY (question_id) REFERENCES public.questions(id) ON DELETE CASCADE;


--
-- Name: referents_components referent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.referents_components
    ADD CONSTRAINT referent_id_fk FOREIGN KEY (referent_id) REFERENCES public.referents(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

